import { Type } from '@angular/core';
import { PrjTaskStatusComponent } from './prj-task-status/prj-task-status.component';


export class CustomizingItem {
  constructor(public component: Type<any>, public data: any) {}
}

export const CUSTOMIZING_CONFIG = [
new CustomizingItem(PrjTaskStatusComponent, { displayName:'项目状态', type:5}),
new CustomizingItem(PrjTaskStatusComponent, { displayName:'项目任务状态', type:0}),
new CustomizingItem(PrjTaskStatusComponent, { displayName:'项目需求类型', type:1}),
new CustomizingItem(PrjTaskStatusComponent, { displayName:'项目角色类型', type:2}),
new CustomizingItem(PrjTaskStatusComponent, { displayName:'项目阶段类型', type:3}),
new CustomizingItem(PrjTaskStatusComponent, { displayName:'项目类型', type:4}),
new CustomizingItem(PrjTaskStatusComponent, { displayName:'项目地址类型', type:6}),
];
