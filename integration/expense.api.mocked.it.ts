import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { ConfigProvider } from "../src/app/core/config.provider";
import { Period } from "../src/app/models/period";
import { ExpenseApi } from './../src/app/expenses/api/expense.api';

const createGetExpenseStub = () => {
  return rest.get("/api/expenses", (req, res, ctx) => {
    const query = req.url.searchParams;
    const month = parseInt(query.get("month"));
    const year = parseInt(query.get("year"));

    if (month > 0 && month <= 12 && year > 0) {
      return res(
        ctx.json([
          {
            id: 1,
            accountId: 1,
            value: 100,
            datetime: new Date(),
            categoryId: 1,
            counterparty: "",
            period: {
              month: 12,
              year: 2020,
            },
          },
        ])
      );
    } else {
      return res(ctx.json([]));
    }
  });
};

describe('ExpenseAPI mocked TCP/IP', () => {
  let api: ExpenseApi;
  const server = setupServer(createGetExpenseStub());

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ExpenseApi,
        {
          provide: ConfigProvider,
          useValue: {
            getConfig: () => ({ apiUrl: "/api" }),
          },
        },
      ],
    });

    api = TestBed.inject(ExpenseApi);
  });

  it('get expenses', (done) => {
    //when
    api.getExpenses(new Period(12, 2020)).subscribe(expenses => {
      // then
      expect(expenses[0].id).toBeDefined();
      expect(expenses[0].accountId).toBeDefined();
      done();
    });
  })

  it('returns an empty array if no expense', (done) => {
    //when
    api.getExpenses(new Period(0, 0)).subscribe(expenses => {
      // then
      expect(expenses).toEqual([]);
      done();
    });
  })
});
