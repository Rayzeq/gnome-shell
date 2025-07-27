import type Gio from "@girs/gio-2.0";

import type { Extension } from "../extensions/extension.js";
import type { ExtensionState, ExtensionType } from "../misc/extensionUtils.js";
import type { MetadataJson } from "./extension-metadata.js";

/**
 *
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/extensionSystem.js#L381
 * @version 49
 */
export interface ExtensionObject {
	metadata: MetadataJson;
	uuid: string;
	type: ExtensionType;
	dir: Gio.File;
	path: string | null;
	error: string;
	hasPrefs: boolean;
	enabled: boolean;
	hasUpdate: boolean;
	canChange: boolean;
	sessionModes: readonly string[];
	state?: ExtensionState;
	stateObj?: Extension;
}
