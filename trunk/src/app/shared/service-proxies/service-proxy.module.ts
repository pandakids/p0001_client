import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import * as ApiServiceProxies from '@shared/service-proxies/service-proxies';

@NgModule({
  providers: [
    ApiServiceProxies.RoleServiceProxy,
    ApiServiceProxies.SessionServiceProxy,
    ApiServiceProxies.TenantServiceProxy,
    ApiServiceProxies.UserServiceProxy,
    ApiServiceProxies.TokenAuthServiceProxy,
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.ProjectModuleServiceProxy,
    ApiServiceProxies.ProjectMainServiceProxy,
    ApiServiceProxies.ProjectRequirementServiceProxy,
    ApiServiceProxies.ProjectTaskServiceProxy,
    ApiServiceProxies.ProjectTaskStatusServiceProxy,
    ApiServiceProxies.ProjectStatusServiceProxy,
    ApiServiceProxies.ProjectTypeServiceProxy,
    ApiServiceProxies.ProjectStageServiceProxy,
    ApiServiceProxies.ProjectCostServiceProxy,
    ApiServiceProxies.ProjectDailyReportServiceProxy,
    ApiServiceProxies.ProjectInComeServiceProxy,
    ApiServiceProxies.ProjectInvestMainServiceProxy,
    ApiServiceProxies.ProjectInvestPercentServiceProxy,
    ApiServiceProxies.ProjectMainRoleServiceProxy,
    ApiServiceProxies.ProjectReqTypeServiceProxy,
    ApiServiceProxies.ProjectRoleServiceProxy,
    ApiServiceProxies.ProjectRoleTypeServiceProxy,
    ApiServiceProxies.ProjectStageServiceProxy,
    ApiServiceProxies.ProjectStageTypeServiceProxy,
    ApiServiceProxies.ProjectTaskDefectServiceProxy,
    ApiServiceProxies.ProjectTypeServiceProxy,
    ApiServiceProxies.BasCompanyServiceProxy,
    ApiServiceProxies.BasSchoolServiceProxy,
    ApiServiceProxies.BasUserServiceProxy,
    ApiServiceProxies.ProjectServiceAddressTypeServiceProxy,
    ApiServiceProxies.ProjectServiceAddressServiceProxy,
    ApiServiceProxies.ProjectVersionServiceProxy,
    ApiServiceProxies.ProfileServiceProxy
  ],
})
export class ServiceProxyModule {}
