import { Component, OnInit, Input,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ProjectMainServiceProxy,UpdateSinglePictureInput
 } from '@shared/service-proxies/service-proxies';
import { FileUploader, FileSelectDirective, FileUploaderOptions, Headers  } from 'ng2-file-upload';
import {
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import * as Contants from '../../../../common/Contants';
import { Events } from '../../../../common/Events';
import { EventType } from '../../../../common/Events';

@Component({
  selector: 'project-logo',
  templateUrl: './project-logo.component.html'
})
export class ProjectLogoComponent implements OnInit {

    @Input() inputData: any;
  validateForm: FormGroup;
  public uploader: FileUploader;
    public temporaryPictureUrl: string;
    public saving = false;

    private maxProfilPictureBytesUserFriendlyValue = 5;
    private temporaryPictureFileName: string;
    private _uploaderOptions: FileUploaderOptions = {};
    private _$profilePictureResize: JQuery;
    private _$jcropApi: any;

    public valid: boolean;
    private url: string;

  constructor(private fb: FormBuilder,
    private modal: NzModalRef,
    private msg: NzMessageService,
    private projectMainServiceProxy: ProjectMainServiceProxy,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,) {

    this.temporaryPictureUrl = '';
        this.temporaryPictureFileName = '';
        this._$profilePictureResize = null;
        this._$jcropApi = null;
        this.initFileUploader();

  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.validateForm = this.fb.group({
      file: [ '', [ Validators.required ] ],
    });
  }

  close() {
    this.modal.destroy();
  }

  submitForm($event, value){
  const self = this;
        if (!self.temporaryPictureFileName) {
            return;
        }

        let resizeParams = { x: 0, y: 0, w: 0, h: 0 };
        if (self._$jcropApi) {
            resizeParams = self._$jcropApi.getSelection();
        }
        
        const containerWidth = Math.ceil(self._$jcropApi.getContainerSize()[0]);
        const containerHeight = Math.ceil(self._$jcropApi.getContainerSize()[1]);

        let originalWidth = containerWidth;
        let originalHeight = containerHeight;

        if (self._$profilePictureResize) {
            originalWidth = parseInt(self._$profilePictureResize.attr('originalWidth'));
            originalHeight = parseInt(self._$profilePictureResize.attr('originalHeight'));
        }

        const widthRatio = originalWidth / containerWidth;
        const heightRatio = originalHeight / containerHeight;

        const input = new UpdateSinglePictureInput();
        input.fileName = self.temporaryPictureFileName;
        input.x = Math.floor(resizeParams.x * widthRatio);
        input.y = Math.floor(resizeParams.y * heightRatio);
        input.width = Math.floor(resizeParams.w * widthRatio);
        input.height = Math.floor(resizeParams.h * heightRatio);
        input.pKey = this.inputData.id;

        this.saving = true;
        self.projectMainServiceProxy.updateProjectPicture(input)
            .finally(() => { this.saving = false; })
            .subscribe(() => {
                const self = this;
                self._$jcropApi.destroy();
                self._$jcropApi = null;
                Events.common.emit(EventType.ProfilePictureChanged);
                self.inputData.logo = self.url;
                self.modal.close(this.url);
                // self.close();
            });
   }

   initFileUploader(): void {
        const self = this;
        self.uploader = new FileUploader({ url: Contants.API.SERVER_URL + '/SingleImage/UploadOnePicture' });
        self._uploaderOptions.autoUpload = true;
        self._uploaderOptions.authToken = 'Bearer ' + this.tokenService.get().token;
        self._uploaderOptions.removeAfterUpload = true;
        self.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        self.uploader.onSuccessItem = (item, response, status) => {
          this._$profilePictureResize = $('#ProfilePictureResize');
            const resp = <any>JSON.parse(response);
            this.valid = resp.success;
            if (resp.success) {
                self.temporaryPictureFileName = resp.result.fileName;
                self.temporaryPictureUrl = Contants.API.SERVER_URL + '/Temp/Downloads/' + resp.result.fileName + '?v=' + new Date().valueOf();
                self.url = Contants.API.SERVER_URL + '/Temp/Downloads/' + resp.result.fileName;
                const newCanvasHeight = resp.result.height * self._$profilePictureResize.width() / resp.result.width;
                self._$profilePictureResize.height(newCanvasHeight + 'px');

                if (self._$jcropApi) {
                    self._$jcropApi.destroy();
                }

                self._$profilePictureResize.attr('src', self.temporaryPictureUrl);
                self._$profilePictureResize.attr('originalWidth', resp.result.width);
                self._$profilePictureResize.attr('originalHeight', resp.result.height);

                self._$profilePictureResize.Jcrop({
                    setSelect: [0, 0, 100, 100],
                    aspectRatio: 1,
                    boxWidth: 400,
                    boxHeight: 400
                }, function () {
                    self._$jcropApi = this;
                });

            } else {
                 this.msg.error(resp.error.message);
            }
        };

        self.uploader.setOptions(self._uploaderOptions);
    }

}
