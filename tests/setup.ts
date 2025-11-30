import { config } from "@vue/test-utils";
import { vi } from "vitest";

export const toastAddMock = vi.fn();
vi.mock("#ui", () => ({
  useToast: () => ({
    add: toastAddMock,
  }),
}));

config.global.components = {
  ...config.global.components,
  RouterLink: { template: "<a><slot /></a>" },
  UForm: { template: "<form><slot /></form>" },
  UFormField: {
    props: {
      label: String,
    },
    template: `
    <div>
      <label :for="$props.name">{{ $props.label }}</label>
      <slot />
    </div>
  `,
  },
  UFormGroup: { template: "<div><slot /></div>" },
  UInput: {
    template: `<input v-bind="$attrs" />`,
    props: {
      name: String,
      type: String,
      placeholder: String,
      modelValue: String,
    },
  },
  UButton: { template: "<button><slot /></button>" },
};
