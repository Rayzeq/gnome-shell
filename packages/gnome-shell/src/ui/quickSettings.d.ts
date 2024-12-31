// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js

import Clutter from '@girs/clutter-15';
import Gio from '@girs/gio-2.0';
import St from '@girs/st-15';

import * as PopupMenu from './popupMenu.js';
import { Slider } from './slider.js';

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L21
 * @version 46
 */
export namespace QuickSettingsItem {
    interface ConstructorProps extends St.Button.ConstructorProps {
        hasMenu: boolean;
    }
}

/**
 * Class representing a quick settings item.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L29
 * @version 46
 */
export class QuickSettingsItem extends St.Button {
    hasMenu: boolean;
    menu: QuickToggleMenu;

    /**
     * Initializes a new instance of `QuickToggle`.
     */
    constructor(params?: Partial<QuickSettingsItem.ConstructorProps>);

    /**
     * Initializes a new instance of `QuickToggle`.
     */
    _init(params?: Partial<QuickSettingsItem.ConstructorProps>): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L43
 * @version 46
 */
export namespace QuickToggle {
    interface ConstructorProps extends QuickSettingsItem.ConstructorProps {
        title: string | null;
        subtitle: string | null;
        gicon: Gio.Icon;
    }
}

/**
 * Class representing a quick toggle item.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L56
 * @version 46
 */
export class QuickToggle extends QuickSettingsItem {
    title: string | null;
    subtitle: string | null;
    gicon: Gio.Icon;

    protected _box: St.BoxLayout;
    protected _icon: St.Icon;
    protected _title: St.Label;
    protected _subtitle: St.Label;

    /**
     * Initializes a new instance of `QuickToggle`.
     */
    constructor(params?: Partial<QuickToggle.ConstructorProps>);

    /**
     * Initializes a new instance of `QuickToggle`.
     */
    _init(params?: Partial<QuickToggle.ConstructorProps>): void;

    get label(): string;
    set label(label: string);
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L144
 * @version 46
 */
export namespace QuickMenuToggle {
    interface ConstructorProps extends QuickSettingsItem.ConstructorProps {
        title: string | null;
        subtitle: string | null;
        gicon: Gio.Icon;
        menuEnabled: boolean;
    }
}

/**
 * Class representing a quick menu toggle.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L161
 * @version 46
 */
export class QuickMenuToggle extends QuickSettingsItem {
    title: string | null;
    subtitle: string | null;
    gicon: Gio.Icon;
    menuEnabled: boolean;

    protected _box: St.BoxLayout;
    protected _menuButton: St.Button;

    /**
     * Initializes a new instance of `QuickMenuToggle`.
     */
    constructor(params?: Partial<QuickMenuToggle.ConstructorProps>);

    /**
     * Initializes a new instance of `QuickMenuToggle`.
     */
    _init(params?: Partial<QuickMenuToggle.ConstructorProps>): void;
}

/**
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L235
 * @version 46
 */
export namespace QuickSlider {
    interface ConstructorProps extends QuickSettingsItem.ConstructorProps {
        gicon: Gio.Icon;
        iconReactive: boolean;
        iconLabel: string;
        menuEnabled: boolean;
    }
}

/**
 * Class representing a quick slider.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L257
 * @version 46
 */
export class QuickSlider extends QuickSettingsItem {
    gicon: Gio.Icon;
    iconReactive: boolean;
    iconLabel: string;
    menuEnabled: boolean;
    slider: Slider;

    protected _icon: St.Icon;
    protected _iconButton: St.Button;
    protected _menuButton: St.Button;

    /**
     * Initializes a new instance of `QuickSlider`.
     */
    constructor(params?: Partial<QuickSlider.ConstructorProps>);

    /**
     * Initializes a new instance of `QuickSlider`.
     */
    _init(params?: Partial<QuickSlider.ConstructorProps>): void;
}

/**
 * Class representing a quick toggle menu.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L350
 * @version 46
 */
export class QuickToggleMenu extends PopupMenu.PopupMenuBase {
    actor: St.Widget;

    protected _header: St.Widget;
    protected _headerIcon: St.Icon;
    protected _headerTitle: St.Label;
    protected _headerSubtitle: St.Label;
    protected _headerSpacer: Clutter.Actor;

    /**
     * Initializes a new instance of `QuickToggleMenu`.
     */
    constructor(sourceActor: St.Widget);

    /**
     * Sets the header of the menu.
     */
    setHeader(icon: string | Gio.Icon, title: string, subtitle?: string): void;

    /**
     * Adds a suffix to the header.
     */
    addHeaderSuffix(actor: Clutter.Actor): void;

    open(animate: boolean): void;
    close(animate: boolean): void;

    protected _syncChecked(): void;

    protected _setOpenedSubMenu(submenu: PopupMenu.PopupSubMenu | null): void;
}

/**
 * Layout metadata for QuickSettingsLayout.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L519
 * @version 46
 */
export class QuickSettingsLayoutMeta extends Clutter.LayoutMeta {
    /**
     * The span of a child widget in grid columns.
     */
    columnSpan: number;
}

/**
 * Custom layout manager for QuickSettingsMenu.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L536
 * @version 46
 */
export class QuickSettingsLayout extends Clutter.LayoutManager {
    /**
     * Spacing between rows.
     */
    rowSpacing: number;

    /**
     * Spacing between columns.
     */
    columnSpacing: number;

    /**
     * Number of columns in the layout.
     */
    nColumns: number;

    /**
     * Overlay actor passed to the constructor
     */
    protected _overlay: Clutter.Actor;

    /**
     * Initializes a new instance of QuickSettingsLayout.
     */
    constructor(overlay: Clutter.Actor, params?: Partial<Clutter.LayoutManager.ConstructorProps>);

    /**
     * Initializes a new instance of QuickSettingsLayout.
     */
    _init(overlay: Clutter.Actor, params?: Partial<Clutter.LayoutManager.ConstructorProps>): void;

    /**
     * Method to get child metadata type.
     */
    vfunc_get_child_meta_type(): typeof Clutter.LayoutMeta.$gtype;

    /**
     * Method for setting the container.
     */
    vfunc_set_container(container: Clutter.Actor): void;

    /**
     * Method to get preferred width.
     */
    vfunc_get_preferred_width(container: Clutter.Actor, forHeight: number): [number, number];

    /**
     * Method to get preferred height.
     */
    vfunc_get_preferred_height(container: Clutter.Actor, forWidth: number): [number, number];

    /**
     * Method to allocate space.
     */
    vfunc_allocate(container: Clutter.Actor, box: Clutter.ActorBox): void;

    protected _containerStyleChanged(): void;
    protected _getColSpan(container: Clutter.Actor, child: Clutter.Actor): number;
    protected _getMaxChildWidth(container: Clutter.Actor): [number, number];
    protected _getRows(container: Clutter.Actor): Clutter.Actor[][];
    protected _getRowHeight(children: Clutter.Actor[]): [number, number];
}

/**
 * Class representing the QuickSettingsMenu.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L708
 * @version 46
 */
export class QuickSettingsMenu extends PopupMenu.PopupMenu {
    protected _dimEffect: Clutter.BrightnessContrastEffect;
    protected _boxPointer: St.Widget;
    protected _grid: St.Widget;
    protected _overlay: Clutter.Actor;

    /**
     * Initializes a new instance of QuickSettingsMenu.
     */
    constructor(sourceActor: Clutter.Actor, nColumns?: number);

    /**
     * Adds an item to the QuickSettingsMenu.
     */
    addItem(item: Clutter.Actor, colSpan?: number): void;

    /**
     * Inserts an item before a sibling in the QuickSettingsMenu.
     */
    insertItemBefore(item: Clutter.Actor, sibling: Clutter.Actor, colSpan?: number): void;

    /**
     * Gets the first item in the QuickSettingsMenu.
     */
    getFirstItem(): Clutter.Actor;

    open(animate: boolean): void;
    close(animate: boolean): void;

    protected _completeAddItem(item: Clutter.Actor, colSpan: number): void;
    protected _setDimmed(dim: boolean): void;
}

/**
 * Class representing a system indicator.
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/quickSettings.js#L832
 * @version 46
 */
export class SystemIndicator extends St.BoxLayout {
    quickSettingsItems: QuickSettingsItem[];

    /**
     * Initializes a new instance of `SystemIndicator`.
     */
    _init(): void;

    /**
     * Sets the visibility of the indicator based on the visibility of its children
     */
    _syncIndicatorsVisible(): void;

    /**
     * Adds an indicator to the system indicator.
     */
    _addIndicator(): St.Icon;
}
