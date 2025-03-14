// https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panel.js

import type St from '@girs/st-16';
import type Clutter from '@girs/clutter-16';
import type Meta from '@girs/meta-16';

import type { DateMenuButton } from './dateMenu.js';
import type { Button } from './panelMenu.js';
import type { PopupMenuManager } from './popupMenu.js';
import type { SystemIndicator } from './quickSettings.js';

import type * as AutoRotateStatus from './status/autoRotate.js';
import type * as BackgroundAppsStatus from './status/backgroundApps.js';
import type * as BacklightStatus from './status/backlight.js';
import type * as BluetoothStatus from './status/bluetooth.js';
import type * as BrightnessStatus from './status/brightness.js';
import type * as CameraStatus from './status/camera.js';
import type * as DarkModeStatus from './status/darkMode.js';
import type * as LocationStatus from './status/location.js';
import type * as NetworkStatus from './status/network.js';
import type * as NightLightStatus from './status/nightLight.js';
import type * as PowerProfileStatus from './status/powerProfiles.js';
import type * as RemoteAccessStatus from './status/remoteAccess.js';
import type * as RFKillStatus from './status/rfkill.js';
import type * as SystemStatus from './status/system.js';
import type * as ThunderboltStatus from './status/thunderbolt.js';
import type * as VolumeStatus from './status/volume.js';


/**
 * @version 47
 */
export class Panel extends St.Widget {
    statusArea: {
        appMenu: any;
        dateMenu: DateMenuButton;
        quickSettings: QuickSettings;
    };

    menuManager: PopupMenuManager;

    boxOpacity: number;

    constructor();
    _init(): void;

    _tryDragWindow(event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _onButtonPress(actor: St.Widget, event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _onTouchEvent(actor: St.Widget, event: Clutter.Event): typeof Clutter.EVENT_STOP | typeof Clutter.EVENT_PROPAGATE;

    _toggleMenu(indicator: Button): void;

    _closeMenu(indicator: Button): void;

    toggleAppMenu(): void;

    toggleCalendar(): void;

    closeCalendar(): void;

    closeQuickSettings(): void;

    _updatePanel(): void;

    _hideIndicators(): void;

    _ensureIndicator(role: string): any;

    updateBox(elements: any[], box: any): void;

    _addToPanelBox(role: string, indicator: Button, position: number, box: any): void;

    addToStatusArea(role: string, indicator: Button, position?: number, box?: any): any;

    _onMenuSet(indicator: Button): void;

    _getDraggableWindowForPosition(stageX: number): Meta.Window | null;
}

/**
 * @version 47
 */
export class QuickSettings extends Button {
    protected _indicators: St.BoxLayout;

    protected _setupIndicators(): Promise<void>;
    protected _addItemsBefore(): void;

    // All those properties are optional because they're defined in an async method,
    // so they might not be defined when an extension loads.
    protected _network?: NetworkStatus.Indicator | null;
    protected _bluetooth?: BluetoothStatus.Indicator | null;
    protected _system?: SystemStatus.Indicator;
    protected _camera?: CameraStatus.Indicator;
    protected _volumeOutput?: VolumeStatus.OutputIndicator;
    protected _volumeInput?: VolumeStatus.InputIndicator;
    protected _brightness?: BrightnessStatus.Indicator;
    protected _remoteAccess?: RemoteAccessStatus.RemoteAccessApplet;
    protected _location?: LocationStatus.Indicator;
    protected _thunderbolt?: ThunderboltStatus.Indicator;
    protected _nightLight?: NightLightStatus.Indicator;
    protected _darkMode?: DarkModeStatus.Indicator;
    protected _backlight?: BacklightStatus.Indicator;
    protected _powerProfiles?: PowerProfileStatus.Indicator;
    protected _rfkill?: RFKillStatus.Indicator;
    protected _autoRotate?: AutoRotateStatus.Indicator;
    protected _unsafeMode?: UnsafeModeIndicator;
    protected _backgroundApps?: BackgroundAppsStatus.Indicator;

    /**
     * Insert indicator and quick settings items at
     * appropriate positions
     */
    addExternalIndicator(indicator: Button, colSpan: number): void;
}

/**
 * @version 47
 */
export class UnsafeModeIndicator extends SystemIndicator {
    _indicator: St.Icon;
}
