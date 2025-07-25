import type Shell from '@girs/shell-16';
import type Clutter from '@girs/clutter-16';

import type * as SignalTracker from '../misc/signalTracker.js';

declare global {
    /**
     * Global shell object created by GNOME Shell on startup.
     *
     * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/8a8539ee6766058b39d0a5c0961a08f76799f4da/js/ui/environment.js#L253
     * @version 46
     */
    const global: Shell.Global;

    // Gnome shell monkey-patches format into `String` which is the recommended way to use formatting for translatable strings.
    // See https://gjs.guide/extensions/development/translations.html#marking-strings-for-translation
    interface String {
        /**
         * Format this string with the given `args`.
         *
         * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/8a8539ee6766058b39d0a5c0961a08f76799f4da/js/ui/environment.js#L355
         * @param args
         */
        format(...args: any[]): string;
    }

    interface Math {
        /**
         * Returns {@link x} clamped to the inclusive range of {@link min} and {@link max}.
         *
         * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/8a8539ee6766058b39d0a5c0961a08f76799f4da/js/ui/environment.js#L357
         * @param x The value to be clamped.
         * @param min The lower bound of the result.
         * @param max The upper bound of the result.
         *
         * @version 46
         */
        clamp(x: number, min: number, max: number): number;
    }
}

/**
 * @version 46
 */
interface EasingParams {
    // milliseconds
    duration?: number;
    // milliseconds
    delay?: number;
    mode?: Clutter.AnimationMode;
    repeatCount?: number;
    autoReverse?: boolean;
    onComplete?: () => void;
    onStopped?: (isFinished: boolean) => void;
}

/**
 * @version 48
 */
interface PropertyEasingParams extends EasingParams, Partial<Clutter.PropertyTransition.ConstructorProps> {}

/**  Any number of extra fields for the properties to be animated (e.g. "opacity: 0").
 *
 * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L133
 *
 * @version 46
 * Note: this list is non exhaustive, since its never typed anywhere else, each parameter is just string in e.g remove_transition, where this is used, so these here are verified manually, but there might be more
 */
type AnimatableActorFields =
    | 'fixed_x'
    | 'fixedX'
    | 'fixed_y'
    | 'fixedY'
    | 'height'
    | 'margin_bottom'
    | 'marginBottom'
    | 'margin_left'
    | 'marginLeft'
    | 'margin_right'
    | 'marginRight'
    | 'margin_top'
    | 'marginTop'
    | 'min_height'
    | 'minHeight'
    | 'min_width'
    | 'minWidth'
    | 'natural_height'
    | 'naturalHeight'
    | 'natural_width'
    | 'naturalWidth'
    | 'opacity'
    | 'pivot_point_z'
    | 'pivotPointZ'
    | 'rotation_angle_x'
    | 'rotationAngleX'
    | 'rotation_angle_y'
    | 'rotationAngleY'
    | 'rotation_angle_z'
    | 'rotationAngleZ'
    | 'scale_x'
    | 'scaleX'
    | 'scale_y'
    | 'scaleY'
    | 'scale_z'
    | 'scaleZ'
    | 'translation_x'
    | 'translationX'
    | 'translation_y'
    | 'translationY'
    | 'translation_z'
    | 'translationZ'
    | 'width'
    | 'x'
    | 'y'
    | 'z_position'
    | 'zPosition';

interface EasingParamsWithProperties extends EasingParams, Partial<Pick<Clutter.Actor, AnimatableActorFields>> {}

declare module '@girs/st-16/st-16' {
    export namespace St {
        interface Adjustment {
            /**
             * A convenience wrapper for adjustments
             *
             * @version 46
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/96e27f0e7d4e0c71976305d0d2c36a6c39d9853c/docs/js-coding-style.md#animations
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L292
             */
            ease<T = unknown>(target: T, params: EasingParamsWithProperties): void;
        }
    }
}

declare module '@girs/clutter-16/clutter-16' {
    export namespace Clutter {
        interface Actor {
            /**
             * A convenience wrapper for actors
             *
             * @version 46
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/96e27f0e7d4e0c71976305d0d2c36a6c39d9853c/docs/js-coding-style.md#animations
             * @see https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/54bc3aa4f54cb5452c29f81fada808224a18afa1/js/ui/environment.js#L286
             */
            ease(props: EasingParamsWithProperties): void;
            ease_property(propName: string, target: any, params: PropertyEasingParams): void;
        }
    }
}

declare module '@girs/gobject-2.0/gobject-2.0' {
    export namespace GObject {
        interface Object {
            connect_object(...args: any[]): ReturnType<typeof SignalTracker.connectObject>;
            disconnect_object(obj: object): ReturnType<typeof SignalTracker.disconnectObject>;

            connectObject(...args: any[]): ReturnType<typeof SignalTracker.connectObject>;
            disconnectObject(obj: object): ReturnType<typeof SignalTracker.disconnectObject>;

        }
    }
}
