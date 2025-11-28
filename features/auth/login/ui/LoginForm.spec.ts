import { describe, it, vi, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import LoginForm from "./LoginForm.vue";
import { useUserStore } from "~/entities/user";

const mockUiComponents = {
  "u-form": { template: "<form @submit=\"$emit('submit')\"><slot /></form>" },
  "u-form-field": { template: "<div><slot /></div>" },
  "u-input": {
    props: ["modelValue", "type", "size", "class"],
    template: `<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />`,
  },
  "u-button": { template: "<button @click=\"$emit('click')\"><slot /></button>" },
  "u-link": { template: "<a><slot /></a>" },
};

vi.mock("~/entities/user", () => ({
  useUserStore: vi.fn(),
}));

describe("LoginForm", () => {
  let mockLogin: ReturnType<typeof vi.fn>;
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    mockLogin = vi.fn();
    (useUserStore as any).mockReturnValue({
      login: mockLogin,
      loading: { login: false },
    });

    wrapper = mount(LoginForm, {
      global: {
        components: mockUiComponents,
      },
    });
  });

  it("Вызывает userStore.login и эмитит success при успешном сабмите", async () => {
    mockLogin.mockResolvedValue(true);

    await wrapper.vm.onSave();

    expect(mockLogin).toHaveBeenCalledWith(wrapper.vm.state);
    expect(wrapper.emitted()).toHaveProperty("success");
  });

  it("Вызывает userStore.login и эмитит error при неуспешном сабмите", async () => {
    mockLogin.mockResolvedValue(false);

    await wrapper.vm.onSave();

    expect(mockLogin).toHaveBeenCalledWith(wrapper.vm.state);
    expect(wrapper.emitted()).toHaveProperty("error");
  });
});
