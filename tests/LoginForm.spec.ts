import { describe, it, expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { LoginForm } from "~/features/auth";

const loginMock = vi.fn().mockResolvedValue(false);
vi.mock("~/entities/user", () => ({
  useUserStore: () => ({
    login: loginMock,
    register: vi.fn().mockResolvedValue(true),
    logout: vi.fn().mockResolvedValue(true),
    loading: { login: false },
  }),
}));

describe("LoginForm", () => {
  it("Проверяет поле Логин name=username", () => {
    const wrapper = mount(LoginForm);

    const usernameInput = wrapper.find(`input[name="username"]`);
    const usernameLabel = wrapper.findAll("label").find((label) => label.text() === "Логин");
    expect(usernameInput.exists()).toBe(true);
    expect(usernameLabel?.exists?.()).toBe(true);
    wrapper.unmount();
  });
  it("Проверяет поле Пароль name=password", () => {
    const wrapper = mount(LoginForm);

    const passwordInput = wrapper.find(`input[name="password"]`);
    const passwordLabel = wrapper.findAll("label").find((label) => label.text() === "Пароль");
    expect(passwordInput.exists()).toBe(true);
    expect(passwordInput.attributes("type")).toBe("password");
    expect(passwordLabel?.exists?.()).toBe(true);

    wrapper.unmount();
  });

  const loginErrorText = "Логин должен содержать минимум 8 символов";
  it("Проверка валидации логина", async () => {
    const wrapper = mount(LoginForm);
    const usernameInput = wrapper.find('input[name="username"]');
    const submitButton = wrapper.find('button[type="submit"]');

    // 1. Ошибка
    await usernameInput.setValue("123");
    await submitButton.trigger("click");
    let errorText = wrapper.findAll(".text-error").find((label) => label.text() === loginErrorText);
    expect(errorText?.exists?.()).toBe(true);
    expect(usernameInput.classes()).toContain("ring-error");

    // 2. Корректный логин
    await usernameInput.setValue("12345678");
    await submitButton.trigger("click");
    errorText = wrapper.findAll(".text-error").find((label) => label.text() === loginErrorText);
    expect(errorText?.exists?.()).toBe(false || undefined);
    expect(usernameInput.classes()).not.toContain("ring-error");

    wrapper.unmount();
  });
  const passwordErrorText = "Пароль должен содержать минимум 8 символов, цифру и заглавную букву.";
  it("Проверка валидации пароля", async () => {
    const wrapper = mount(LoginForm);
    const passwordInput = wrapper.find('input[name="password"]');
    const submitButton = wrapper.find('button[type="submit"]');

    // 1. Ошибка
    await passwordInput.setValue("1234567");
    await submitButton.trigger("click");
    let errorText = wrapper
      .findAll(".text-error")
      .find((label) => label.text() === passwordErrorText);
    expect(errorText?.exists?.()).toBe(true);
    expect(passwordInput.classes()).toContain("ring-error");

    await passwordInput.setValue("password123");
    await submitButton.trigger("click");
    errorText = wrapper.findAll(".text-error").find((label) => label.text() === passwordErrorText);
    expect(errorText?.exists?.()).toBe(true);
    expect(passwordInput.classes()).toContain("ring-error");

    // 2. Корректный пароль
    await passwordInput.setValue("Password123");
    await submitButton.trigger("click");
    errorText = wrapper.findAll(".text-error").find((label) => label.text() === passwordErrorText);
    expect(errorText?.exists?.()).toBe(false || undefined);
    expect(passwordInput.classes()).not.toContain("ring-error");

    wrapper.unmount();
  });

  it("Неудачная авторизация", async () => {
    const wrapper = mount(LoginForm);

    const usernameInput = wrapper.find('input[name="username"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const form = wrapper.find("form");

    await Promise.all([
      usernameInput.setValue("Login123"),
      passwordInput.setValue("Password123"),
      form.trigger("submit.prevent"),
    ]);

    await flushPromises();

    expect(wrapper.emitted().error).toBeTruthy();
  });

  it("Успешная авторизация", async () => {
    loginMock.mockResolvedValueOnce(true);

    const wrapper = mount(LoginForm);

    const usernameInput = wrapper.find('input[name="username"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const form = wrapper.find("form");

    await Promise.all([
      usernameInput.setValue("Login123"),
      passwordInput.setValue("Password123"),
      form.trigger("submit.prevent"),
    ]);

    await flushPromises();

    expect(wrapper.emitted().success).toBeTruthy();
  });
});
