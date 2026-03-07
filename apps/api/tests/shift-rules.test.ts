import { describe, expect, it } from "vitest";
import { assertNoOverlap, hasOverlap } from "../src/modules/shifts/domain/rules.js";

describe("shift overlap rules", () => {
  it("detects overlap correctly", () => {
    const a = {
      id: "a",
      startsAt: new Date("2026-03-07T10:00:00.000Z"),
      endsAt: new Date("2026-03-07T12:00:00.000Z"),
    };
    const b = {
      id: "b",
      startsAt: new Date("2026-03-07T11:00:00.000Z"),
      endsAt: new Date("2026-03-07T13:00:00.000Z"),
    };

    expect(hasOverlap(a, b)).toBe(true);
  });

  it("rejects assigning an overlapping shift", () => {
    const existing = [
      {
        id: "existing",
        startsAt: new Date("2026-03-07T10:00:00.000Z"),
        endsAt: new Date("2026-03-07T12:00:00.000Z"),
      },
    ];
    const target = {
      id: "target",
      startsAt: new Date("2026-03-07T11:30:00.000Z"),
      endsAt: new Date("2026-03-07T13:00:00.000Z"),
    };

    expect(() => assertNoOverlap(existing, target)).toThrowError(
      "Employee cannot have overlapping shifts.",
    );
  });

  it("allows adjacent shifts without overlap", () => {
    const existing = [
      {
        id: "existing",
        startsAt: new Date("2026-03-07T10:00:00.000Z"),
        endsAt: new Date("2026-03-07T12:00:00.000Z"),
      },
    ];
    const target = {
      id: "target",
      startsAt: new Date("2026-03-07T12:00:00.000Z"),
      endsAt: new Date("2026-03-07T14:00:00.000Z"),
    };

    expect(() => assertNoOverlap(existing, target)).not.toThrow();
  });
});
