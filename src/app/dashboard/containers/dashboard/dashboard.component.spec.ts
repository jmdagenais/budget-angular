import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { PeriodService } from "app/shared/services/period.service";

import { CacheService } from "../../../core/cache.service";
import { ConfigProvider } from "../../../core/config.provider";
import { BudgetApi } from "../../../dashboard/api/budget.api";
import { BudgetProgressComponent } from "../../../dashboard/components/budget-progress/budget-progress.component";
import { SummaryComponent } from "../../../dashboard/components/summary/summary.component";
import { SharedModule } from "../../../shared/shared.module";
import { DashboardService } from "../../dashboard.service";
import { DashboardComponent } from "./dashboard.component";

describe('DashboardComponent - isolated', () => {
  let component: DashboardComponent;
  let dashboardServiceMock: Pick<DashboardService, 'getBudgetSummary' | 'getBudgets'>;
  let periodServiceMock: Pick<PeriodService, 'getCurrentPeriod'>;

  beforeEach(() => {
    dashboardServiceMock = {
      getBudgetSummary: jest.fn(),
      getBudgets: jest.fn(() => of())
    };

    periodServiceMock = {
      getCurrentPeriod: jest.fn()
    };

    component = new DashboardComponent(
      dashboardServiceMock as DashboardService,
      periodServiceMock as PeriodService
    );
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('initialize the period and budgets', () => {
    component.ngOnInit();
    expect(periodServiceMock.getCurrentPeriod).toHaveBeenCalled();
    expect(dashboardServiceMock.getBudgetSummary).toHaveBeenCalled();
    expect(dashboardServiceMock.getBudgets).toHaveBeenCalled();
  });

});




describe('DashboardComponent - deep', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, SummaryComponent, BudgetProgressComponent],
      imports: [SharedModule, HttpClientModule],
      providers: [DashboardService, BudgetApi, ConfigProvider, CacheService],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });
});
