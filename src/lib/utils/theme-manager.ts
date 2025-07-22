import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

const IS_CLIENT: boolean = typeof window !== "undefined";

export class ThemeManager {
	private static KEY: string = "theme";

	public static init(): Writable<Theme> {
		const maybeStoredTheme = IS_CLIENT
			&& localStorage.getItem(ThemeManager.KEY) as Theme || undefined;

		const theme = maybeStoredTheme || "light";
		if (IS_CLIENT) localStorage.setItem(ThemeManager.KEY, theme);

		return setContext(ThemeManager.KEY, writable(theme));
	}

	public static get(): Writable<Theme> {
		return getContext(ThemeManager.KEY);
	}

	public static toggle(themeWritable: Writable<Theme>, oldTheme: Theme) {
		const newTheme = oldTheme === "light" ? "night" : "light";

		themeWritable.set(newTheme);
		if (IS_CLIENT) localStorage.setItem(ThemeManager.KEY, newTheme);
	}
}

export type Theme = "light" | "night";
