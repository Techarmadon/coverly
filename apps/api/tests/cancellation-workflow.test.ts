import { describe, expect, it } from "vitest";
import {
  applyCancellationDecision,
  canEmployeeRequestCancellation,
} from "../src/modules/shifts/domain/cancellation.js";

describe("cancellation workflow rules", () => {
  it("allows cancellation request only for assigned employee", () => {
    expect(
      canEmployeeRequestCancellation({
        assignedEmployeeId: "employee-1",
        employeeId: "employee-1",
      }),
    ).toBe(true);

    expect(
      canEmployeeRequestCancellation({
        assignedEmployeeId: "employee-2",
        employeeId: "employee-1",
      }),
    ).toBe(false);
  });

  it("reopens the shift on owner approval", () => {
    const result = applyCancellationDecision({
      decision: "approved",
      currentShiftStatus: "booked",
    });

    expect(result.assignedEmployeeId).toBeNull();
    expect(result.nextShiftStatus).toBe("published");
  });

  it("keeps assignment on owner rejection", () => {
    const result = applyCancellationDecision({
      decision: "rejected",
      currentShiftStatus: "booked",
    });

    expect(result.assignedEmployeeId).toBeUndefined();
    expect(result.nextShiftStatus).toBe("booked");
  });
});
