import { describe, it, vi, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import RegisterForm from "./RegisterForm.vue";
import { useUserStore } from "~/entities/user";

const mockUiComponents = {
  "u-form": { template: "<form @submit=\"$emit('submit')\"><slot /></form>" },
  "u-form-field": { template: "<div><slot /></div>" },
  "u-input": {
    props: ["modelValue", "type", "size", "class"],
    template:
      '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
  },
  "u-button": { template: "<button @click=\"$emit('click')\"><slot /></button>" },
  "u-link": { template: "<a><slot /></a>" },
};

vi.mock("~/entities/user", () => ({
  useUserStore: vi.fn(),
}));

describe("RegisterForm", () => {
  let mockRegister: ReturnType<typeof vi.fn>;
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    mockRegister = vi.fn();
    (useUserStore as any).mockReturnValue({
      register: mockRegister,
      loading: { register: false },
    });

    wrapper = mount(RegisterForm, {
      global: {
        components: mockUiComponents,
      },
    });
  });

  it("Вызывает userStore.register и эмитит success при успешном сабмите", async () => {
    mockRegister.mockResolvedValue(true);

    await wrapper.vm.onSave();

    expect(mockRegister).toHaveBeenCalledWith(wrapper.vm.state);
    expect(wrapper.emitted()).toHaveProperty("success");
  });

  it("Вызывает userStore.register и эмитит error при неуспешном сабмите", async () => {
    mockRegister.mockResolvedValue(false);

    await wrapper.vm.onSave();

    expect(mockRegister).toHaveBeenCalledWith(wrapper.vm.state);
    expect(wrapper.emitted()).toHaveProperty("error");
  });

  it("Валидирует, что пароли не совпадают", () => {
    wrapper.vm.state.password = "Password123";
    wrapper.vm.state.repeatPassword = "Password321";

    const errors = wrapper.vm.validate(wrapper.vm.state);
    expect(errors).toContainEqual({ name: "repeatPassword", message: "Пароли не совпадают" });
  });

  it("Валидирует логин и пароль", () => {
    wrapper.vm.state.username = "short";
    wrapper.vm.state.password = "pass";

    const errors = wrapper.vm.validate(wrapper.vm.state);
    expect(errors).toContainEqual({
      name: "username",
      message: "Логин должен содержать минимум 8 символов",
    });
    expect(errors).toContainEqual({
      name: "password",
      message: "Пароль должен содержать минимум 8 символов, цифру и заглавную букву.",
    });
  });
});
