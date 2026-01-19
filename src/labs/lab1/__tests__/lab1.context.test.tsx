import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, TenantOverrideProvider } from "../authContext";
import { ReadWithUse } from "../ReadWithUse";
import { ReadWithUseContext } from "../ReadWithUseContext";
import { Controls } from "../Controls";

function TestHarness({ withOverride }: { withOverride?: boolean }) {
  const inner = (
    <div>
      <Controls />
      <div>
        <ReadWithUseContext />
        <ReadWithUse />
      </div>
    </div>
  );

  return (
    <AuthProvider>
      {withOverride ? (
        <TenantOverrideProvider tenantId="t_override_demo">{inner}</TenantOverrideProvider>
      ) : (
        inner
      )}
    </AuthProvider>
  );
}

describe("Lab1 context patterns", () => {
  it("renders same auth values for useContext and use(Context)", () => {
    render(<TestHarness />);

    // Both readers should show baseline tenantId
    const tenantIdCodes = screen.getAllByText("t_pamelo");
    expect(tenantIdCodes.length).toBeGreaterThanOrEqual(2);

    // Both readers should show baseline role
    const roleCodes = screen.getAllByText("member");
    expect(roleCodes.length).toBeGreaterThanOrEqual(2);
  });

  it("applies nested provider override consistently", () => {
    render(<TestHarness withOverride />);

    const tenantIdCodes = screen.getAllByText("t_override_demo");
    expect(tenantIdCodes.length).toBeGreaterThanOrEqual(2);
  });

  it("controls update role and both readers reflect the change", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    // Role is initially member
    expect(screen.getAllByText("member").length).toBeGreaterThanOrEqual(2);

    const roleSelect = screen.getByRole("combobox");
    await user.selectOptions(roleSelect, "admin");

    // Both readers should now show admin
    expect(screen.getAllByText("admin").length).toBeGreaterThanOrEqual(2);
  });

  it("controls rotate user and both readers reflect the change", async () => {
    const user = userEvent.setup();
    render(<TestHarness />);

    // Starts with u_1001
    expect(screen.getAllByText("u_1001").length).toBeGreaterThanOrEqual(2);

    const rotateBtn = screen.getByRole("button", { name: /rotate user/i });
    await user.click(rotateBtn);

    // Now should be u_2048 in both readers
    expect(screen.getAllByText("u_2048").length).toBeGreaterThanOrEqual(2);
  });
});
