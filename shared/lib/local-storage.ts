import { ref, watch, onMounted } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storageRef = ref<T>(defaultValue);

  onMounted(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        storageRef.value = JSON.parse(stored) as T;
      }
    } catch (err) {
      console.warn(`localStorage get key err "${key}":`, err);
    }
  });

  watch(
    storageRef,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (err) {
        console.error(`localStorage set key err "${key}":`, err);
      }
    },
    { deep: true },
  );

  function set(value: T) {
    storageRef.value = value;
  }

  function remove() {
    localStorage.removeItem(key);
    storageRef.value = defaultValue;
  }

  return {
    ref: storageRef,
    set,
    remove,
  };
}
