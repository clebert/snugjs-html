import type {ElementFactory} from './create-element-factory.js';

import {createElementFactory} from './create-element-factory.js';

export function createElement<
  TTagName extends keyof createElement.JSX.IntrinsicElements,
>(
  tag: TTagName,
  props: Omit<createElement.JSX.IntrinsicElements[TTagName], 'children'>,
  ...children: readonly unknown[]
): HTMLElementTagNameMap[TTagName];

export function createElement<TProps extends object>(
  tag: ElementFactory<TProps>,
  props: TProps & createElement.JSX.ElementKeyAttribute,
  ...children: readonly unknown[]
): createElement.JSX.Element;

export function createElement(
  tag: string | ElementFactory<object>,
  props: object | null,
  ...children: readonly unknown[]
): any {
  const elementFactory =
    typeof tag === `string` ? createElementFactory(tag, replaceChildren) : tag;

  return elementFactory({...props, children});
}

function replaceChildren(
  element: createElement.JSX.Element,
  childNodes: readonly Node[],
): void {
  element.replaceChildren(...childNodes);
}

export namespace createElement {
  export namespace JSX {
    export type Element = DocumentFragment | HTMLElement;

    export interface ElementChildrenAttribute {
      readonly children?: unknown;
    }

    export interface ElementKeyAttribute {
      readonly key?: object;
    }

    export interface IntrinsicElement
      extends ElementChildrenAttribute,
        ElementKeyAttribute {
      /** Keyboard shortcut to activate or focus element */
      readonly accesskey?: string;
      /** Recommended autocapitalization behavior (for supported input methods) */
      readonly autocapitalize?:
        | 'on'
        | 'off'
        | 'none'
        | 'sentences'
        | 'words'
        | 'characters';
      /** Automatically focus the element when the page is loaded */
      readonly autofocus?: boolean;
      /** Classes to which the element belongs */
      readonly class?: string;
      /** Whether the element is editable */
      readonly contenteditable?: 'true' | 'plaintext-only' | 'false';
      /** The text directionality of the element */
      readonly dir?: 'ltr' | 'rtl' | 'auto';
      /** Whether the element is draggable */
      readonly draggable?: 'true' | 'false';
      /** Hint for selecting an enter key action */
      readonly enterkeyhint?:
        | 'enter'
        | 'done'
        | 'go'
        | 'next'
        | 'previous'
        | 'search'
        | 'send';
      /** Whether the element is relevant */
      readonly hidden?: boolean | 'until-found';
      /** The element's ID */
      readonly id?: string;
      /** Whether the element is inert. */
      readonly inert?: boolean;
      /** Hint for selecting an input modality */
      readonly inputmode?:
        | 'none'
        | 'text'
        | 'tel'
        | 'email'
        | 'url'
        | 'numeric'
        | 'decimal'
        | 'search';
      /** Creates a customized built-in element */
      readonly is?: string;
      /** Global identifier for a microdata item */
      readonly itemid?: string;
      /** Property names of a microdata item */
      readonly itemprop?: string;
      /** Referenced elements */
      readonly itemref?: string;
      /** Introduces a microdata item */
      readonly itemscope?: boolean;
      /** Item types of a microdata item */
      readonly itemtype?: string;
      /** Language of the element */
      readonly lang?: string;
      /** Cryptographic nonce used in Content Security Policy checks [CSP] */
      readonly nonce?: string;
      /** Makes the element a popover element */
      readonly popover?: 'auto' | 'manual';
      /** Affects willValidate, plus any behavior added by the custom element author */
      readonly readonly?: boolean;
      /** The element's desired slot */
      readonly slot?: string;
      /** Whether the element is to have its spelling and grammar checked */
      readonly spellcheck?: 'true' | 'false';
      /** Presentational and formatting instructions */
      readonly style?: string;
      /** Whether the element is focusable and sequentially focusable, and the relative order of the element for the purposes of sequential focus navigation */
      readonly tabindex?: number;
      /** Advisory information for the element */
      readonly title?: string;
      /** Whether the element is to be translated when the page is localized */
      readonly translate?: 'yes' | 'no';
    }

    export interface IntrinsicElements {
      readonly a: IntrinsicElement & {
        /** Whether to download the resource instead of navigating to it, and its filename if so */
        readonly download?: string;
        /** Address of the hyperlink */
        readonly href?: string;
        /** Language of the linked resource */
        readonly hreflang?: string;
        /** URLs to ping */
        readonly ping?: string;
        /** Referrer policy for fetches initiated by the element */
        readonly referrerpolicy?: string;
        /** Relationship between the location in the document containing the hyperlink and the destination resource */
        readonly rel?: string;
        /** Navigable for hyperlink navigation */
        readonly target?: string;
        /** Hint for the type of the referenced resource */
        readonly type?: string;
      };
      readonly abbr: IntrinsicElement & {
        /** Full term or expansion of abbreviation */
        readonly title?: string;
      };
      readonly address: IntrinsicElement & {};
      readonly area: IntrinsicElement & {
        /** Replacement text for use when images are not available */
        readonly alt?: string;
        /** Coordinates for the shape to be created in an image map */
        readonly coords?: string;
        /** Whether to download the resource instead of navigating to it, and its filename if so */
        readonly download?: string;
        /** Address of the hyperlink */
        readonly href?: string;
        /** URLs to ping */
        readonly ping?: string;
        /** Referrer policy for fetches initiated by the element */
        readonly referrerpolicy?: string;
        /** Relationship between the location in the document containing the hyperlink and the destination resource */
        readonly rel?: string;
        /** The kind of shape to be created in an image map */
        readonly shape?: 'circle' | 'default' | 'poly' | 'rect';
        /** Navigable for hyperlink navigation */
        readonly target?: string;
      };
      readonly article: IntrinsicElement & {};
      readonly aside: IntrinsicElement & {};
      readonly audio: IntrinsicElement & {
        /** Hint that the media resource can be started automatically when the page is loaded */
        readonly autoplay?: boolean;
        /** Show user agent controls */
        readonly controls?: boolean;
        /** How the element handles crossorigin requests */
        readonly crossorigin?: 'anonymous' | 'use-credentials';
        /** Whether to loop the media resource */
        readonly loop?: boolean;
        /** Whether to mute the media resource by default */
        readonly muted?: boolean;
        /** Hints how much buffering the media resource will likely need */
        readonly preload?: 'none' | 'metadata' | 'auto';
        /** Address of the resource */
        readonly src?: string;
      };
      readonly b: IntrinsicElement & {};
      readonly base: IntrinsicElement & {
        /** Document base URL */
        readonly href?: string;
        /** Default navigable for hyperlink navigation and form submission */
        readonly target?: string;
      };
      readonly bdi: IntrinsicElement & {};
      readonly bdo: IntrinsicElement & {
        /** The text directionality of the element */
        readonly dir?: 'ltr' | 'rtl';
      };
      readonly blockquote: IntrinsicElement & {
        /** Link to the source of the quotation or more information about the edit */
        readonly cite?: string;
      };
      readonly body: IntrinsicElement & {};
      readonly br: IntrinsicElement & {};
      readonly button: IntrinsicElement & {
        /** Whether the form control is disabled */
        readonly disabled?: boolean;
        /** Associates the element with a form element */
        readonly form?: string;
        /** URL to use for form submission */
        readonly formaction?: string;
        /** Entry list encoding type to use for form submission */
        readonly formenctype?:
          | 'application/x-www-form-urlencoded'
          | 'multipart/form-data'
          | 'text/plain';
        /** Variant to use for form submission */
        readonly formmethod?: 'GET' | 'POST' | 'dialog';
        /** Bypass form control validation for form submission */
        readonly formnovalidate?: boolean;
        /** Navigable for form submission */
        readonly formtarget?: string;
        /** Name of the element to use for form submission and in the form.elements API */
        readonly name?: string;
        /** Targets a popover element to toggle, show, or hide */
        readonly popovertarget?: string;
        /** Indicates whether a targeted popover element is to be toggled, shown, or hidden */
        readonly popovertargetaction?: 'toggle' | 'show' | 'hide';
        /** Type of button */
        readonly type?: 'submit' | 'reset' | 'button';
        /** Value to be used for form submission */
        readonly value?: string;
      };
      readonly canvas: IntrinsicElement & {
        /** Vertical dimension */
        readonly height?: number;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly caption: IntrinsicElement & {};
      readonly cite: IntrinsicElement & {};
      readonly code: IntrinsicElement & {};
      readonly col: IntrinsicElement & {
        /** Number of columns spanned by the element */
        readonly span?: number;
      };
      readonly colgroup: IntrinsicElement & {
        /** Number of columns spanned by the element */
        readonly span?: number;
      };
      readonly data: IntrinsicElement & {
        /** Machine-readable value */
        readonly value?: string;
      };
      readonly datalist: IntrinsicElement & {};
      readonly dd: IntrinsicElement & {};
      readonly del: IntrinsicElement & {
        /** Link to the source of the quotation or more information about the edit */
        readonly cite?: string;
        /** Date and (optionally) time of the change */
        readonly datetime?: string;
      };
      readonly details: IntrinsicElement & {
        /** Whether the details are visible */
        readonly open?: boolean;
      };
      readonly dfn: IntrinsicElement & {
        /** Full term or expansion of abbreviation */
        readonly title?: string;
      };
      readonly dialog: IntrinsicElement & {
        /** Whether the dialog box is showing */
        readonly open?: boolean;
      };
      readonly div: IntrinsicElement & {};
      readonly dl: IntrinsicElement & {};
      readonly dt: IntrinsicElement & {};
      readonly em: IntrinsicElement & {};
      readonly embed: IntrinsicElement & {
        /** Vertical dimension */
        readonly height?: number;
        /** Address of the resource */
        readonly src?: string;
        /** Type of embedded resource */
        readonly type?: string;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly fieldset: IntrinsicElement & {
        /** Whether the descendant form controls, except any inside legend, are disabled */
        readonly disabled?: boolean;
        /** Associates the element with a form element */
        readonly form?: string;
        /** Name of the element to use for form submission and in the form.elements API */
        readonly name?: string;
      };
      readonly figcaption: IntrinsicElement & {};
      readonly figure: IntrinsicElement & {};
      readonly footer: IntrinsicElement & {};
      readonly form: IntrinsicElement & {
        /** Character encodings to use for form submission */
        readonly 'accept-charset'?: string;
        /** URL to use for form submission */
        readonly 'action'?: string;
        /** Default setting for autofill feature for controls in the form */
        readonly 'autocomplete'?: 'on' | 'off';
        /** Entry list encoding type to use for form submission */
        readonly 'enctype'?:
          | 'application/x-www-form-urlencoded'
          | 'multipart/form-data'
          | 'text/plain';
        /** Variant to use for form submission */
        readonly 'method'?: 'GET' | 'POST' | 'dialog';
        /** Name of form to use in the document.forms API */
        readonly 'name'?: string;
        /** Bypass form control validation for form submission */
        readonly 'novalidate'?: boolean;
        /** Navigable for form submission */
        readonly 'target'?: string;
      };
      readonly h1: IntrinsicElement & {};
      readonly h2: IntrinsicElement & {};
      readonly h3: IntrinsicElement & {};
      readonly h4: IntrinsicElement & {};
      readonly h5: IntrinsicElement & {};
      readonly h6: IntrinsicElement & {};
      readonly head: IntrinsicElement & {};
      readonly header: IntrinsicElement & {};
      readonly hgroup: IntrinsicElement & {};
      readonly hr: IntrinsicElement & {};
      readonly html: IntrinsicElement & {};
      readonly i: IntrinsicElement & {};
      readonly iframe: IntrinsicElement & {
        /** Permissions policy to be applied to the iframe's contents */
        readonly allow?: string;
        /** Whether to allow the iframe's contents to use requestFullscreen() */
        readonly allowfullscreen?: boolean;
        /** Vertical dimension */
        readonly height?: number;
        /** Used when determining loading deferral */
        readonly loading?: 'lazy' | 'eager';
        /** Name of content navigable */
        readonly name?: string;
        /** Referrer policy for fetches initiated by the element */
        readonly referrerpolicy?: string;
        /** Security rules for nested content */
        readonly sandbox?: string;
        /** Address of the resource */
        readonly src?: string;
        /** A document to render in the iframe */
        readonly srcdoc?: string;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly img: IntrinsicElement & {
        /** Replacement text for use when images are not available */
        readonly alt?: string;
        /** How the element handles crossorigin requests */
        readonly crossorigin?: 'anonymous' | 'use-credentials';
        /** Decoding hint to use when processing this image for presentation */
        readonly decoding?: 'sync' | 'async' | 'auto';
        /** Sets the priority for fetches initiated by the element */
        readonly fetchpriority?: 'auto' | 'high' | 'low';
        /** Vertical dimension */
        readonly height?: number;
        /** Whether the image is a server-side image map */
        readonly ismap?: boolean;
        /** Used when determining loading deferral */
        readonly loading?: 'lazy' | 'eager';
        /** Referrer policy for fetches initiated by the element */
        readonly referrerpolicy?: string;
        /** Image sizes for different page layouts */
        readonly sizes?: string;
        /** Address of the resource */
        readonly src?: string;
        /** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
        readonly srcset?: string;
        /** Name of image map to use */
        readonly usemap?: string;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly input: IntrinsicElement & {
        /** Hint for expected file type in file upload controls */
        readonly accept?: string;
        /** Replacement text for use when images are not available */
        readonly alt?: string;
        /** Hint for form autofill feature */
        readonly autocomplete?: string;
        /** Whether the control is checked */
        readonly checked?: boolean;
        /** Name of form control to use for sending the element's directionality in form submission */
        readonly dirname?: string;
        /** Whether the form control is disabled */
        readonly disabled?: boolean;
        /** Associates the element with a form element */
        readonly form?: string;
        /** URL to use for form submission */
        readonly formaction?: string;
        /** Entry list encoding type to use for form submission */
        readonly formenctype?:
          | 'application/x-www-form-urlencoded'
          | 'multipart/form-data'
          | 'text/plain';
        /** Variant to use for form submission */
        readonly formmethod?: 'GET' | 'POST' | 'dialog';
        /** Bypass form control validation for form submission */
        readonly formnovalidate?: boolean;
        /** Navigable for form submission */
        readonly formtarget?: string;
        /** Vertical dimension */
        readonly height?: number;
        /** List of autocomplete options */
        readonly list?: string;
        /** Maximum value */
        readonly max?: string;
        /** Maximum length of value */
        readonly maxlength?: number;
        /** Minimum value */
        readonly min?: string;
        /** Minimum length of value */
        readonly minlength?: number;
        /** Whether to allow multiple values */
        readonly multiple?: boolean;
        /** Name of the element to use for form submission and in the form.elements API */
        readonly name?: string;
        /** Pattern to be matched by the form control's value */
        readonly pattern?: string;
        /** User-visible label to be placed within the form control */
        readonly placeholder?: string;
        /** Targets a popover element to toggle, show, or hide */
        readonly popovertarget?: string;
        /** Indicates whether a targeted popover element is to be toggled, shown, or hidden */
        readonly popovertargetaction?: 'toggle' | 'show' | 'hide';
        /** Whether to allow the value to be edited by the user */
        readonly readonly?: boolean;
        /** Whether the control is required for form submission */
        readonly required?: boolean;
        /** Size of the control */
        readonly size?: number;
        /** Address of the resource */
        readonly src?: string;
        /** Granularity to be matched by the form control's value */
        readonly step?: number | 'any';
        /** Description of pattern (when used with pattern attribute) */
        readonly title?: string;
        /** Type of form control */
        readonly type?: string;
        /** Value of the form control */
        readonly value?: string;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly ins: IntrinsicElement & {
        /** Link to the source of the quotation or more information about the edit */
        readonly cite?: string;
        /** Date and (optionally) time of the change */
        readonly datetime?: string;
      };
      readonly kbd: IntrinsicElement & {};
      readonly label: IntrinsicElement & {
        /** Associate the label with form control */
        readonly for?: string;
      };
      readonly legend: IntrinsicElement & {};
      readonly li: IntrinsicElement & {
        /** Ordinal value of the list item */
        readonly value?: number;
      };
      readonly link: IntrinsicElement & {
        /** Potential destination for a preload request (for rel="preload" and rel="modulepreload") */
        readonly as?: string;
        /** Whether the element is potentially render-blocking */
        readonly blocking?: string;
        /** Color to use when customizing a site's icon (for rel="mask-icon") */
        readonly color?: string;
        /** How the element handles crossorigin requests */
        readonly crossorigin?: 'anonymous' | 'use-credentials';
        /** Whether the link is disabled */
        readonly disabled?: boolean;
        /** Sets the priority for fetches initiated by the element */
        readonly fetchpriority?: 'auto' | 'high' | 'low';
        /** Address of the hyperlink */
        readonly href?: string;
        /** Language of the linked resource */
        readonly hreflang?: string;
        /** Image sizes for different page layouts (for rel="preload") */
        readonly imagesizes?: string;
        /** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. (for rel="preload") */
        readonly imagesrcset?: string;
        /** Integrity metadata used in Subresource Integrity checks [SRI] */
        readonly integrity?: string;
        /** Applicable media */
        readonly media?: string;
        /** Referrer policy for fetches initiated by the element */
        readonly referrerpolicy?: string;
        /** Relationship between the document containing the hyperlink and the destination resource */
        readonly rel?: string;
        /** Sizes of the icons (for rel="icon") */
        readonly sizes?: string;
        /** CSS style sheet set name */
        readonly title?: string;
        /** Hint for the type of the referenced resource */
        readonly type?: string;
      };
      readonly main: IntrinsicElement & {};
      readonly map: IntrinsicElement & {
        /** Name of image map to reference from the usemap attribute */
        readonly name?: string;
      };
      readonly mark: IntrinsicElement & {};
      readonly menu: IntrinsicElement & {};
      readonly meta: IntrinsicElement & {
        /** Character encoding declaration */
        readonly 'charset'?: 'utf-8';
        /** Value of the element */
        readonly 'content'?: string;
        /** Pragma directive */
        readonly 'http-equiv'?:
          | 'content-type'
          | 'default-style'
          | 'refresh'
          | 'x-ua-compatible'
          | 'content-security-policy';
        /** Applicable media */
        readonly 'media'?: string;
        /** Metadata name */
        readonly 'name'?: string;
      };
      readonly meter: IntrinsicElement & {
        /** Low limit of high range */
        readonly high?: number;
        /** High limit of low range */
        readonly low?: number;
        /** Upper bound of range */
        readonly max?: number;
        /** Lower bound of range */
        readonly min?: number;
        /** Optimum value in gauge */
        readonly optimum?: number;
        /** Current value of the element */
        readonly value?: number;
      };
      readonly nav: IntrinsicElement & {};
      readonly noscript: IntrinsicElement & {};
      readonly object: IntrinsicElement & {
        /** Address of the resource */
        readonly data?: string;
        /** Associates the element with a form element */
        readonly form?: string;
        /** Vertical dimension */
        readonly height?: number;
        /** Name of content navigable */
        readonly name?: string;
        /** Type of embedded resource */
        readonly type?: string;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly ol: IntrinsicElement & {
        /** Number the list backwards */
        readonly reversed?: boolean;
        /** Starting value of the list */
        readonly start?: number;
        /** Kind of list marker */
        readonly type?: '1' | 'a' | 'A' | 'i' | 'I';
      };
      readonly optgroup: IntrinsicElement & {
        /** Whether the form control is disabled */
        readonly disabled?: boolean;
        /** User-visible label */
        readonly label?: string;
      };
      readonly option: IntrinsicElement & {
        /** Whether the form control is disabled */
        readonly disabled?: boolean;
        /** User-visible label */
        readonly label?: string;
        /** Whether the option is selected by default */
        readonly selected?: boolean;
        /** Value to be used for form submission */
        readonly value?: string;
      };
      readonly output: IntrinsicElement & {
        /** Specifies controls from which the output was calculated */
        readonly for?: string;
        /** Associates the element with a form element */
        readonly form?: string;
        /** Name of the element to use for form submission and in the form.elements API */
        readonly name?: string;
      };
      readonly p: IntrinsicElement & {};
      readonly picture: IntrinsicElement & {};
      readonly pre: IntrinsicElement & {};
      readonly progress: IntrinsicElement & {
        /** Upper bound of range */
        readonly max?: number;
        /** Current value of the element */
        readonly value?: number;
      };
      readonly q: IntrinsicElement & {
        /** Link to the source of the quotation or more information about the edit */
        readonly cite?: string;
      };
      readonly rp: IntrinsicElement & {};
      readonly rt: IntrinsicElement & {};
      readonly ruby: IntrinsicElement & {};
      readonly s: IntrinsicElement & {};
      readonly samp: IntrinsicElement & {};
      readonly script: IntrinsicElement & {
        /** Execute script when available, without blocking while fetching */
        readonly async?: boolean;
        /** Whether the element is potentially render-blocking */
        readonly blocking?: string;
        /** How the element handles crossorigin requests */
        readonly crossorigin?: 'anonymous' | 'use-credentials';
        /** Defer script execution */
        readonly defer?: boolean;
        /** Sets the priority for fetches initiated by the element */
        readonly fetchpriority?: 'auto' | 'high' | 'low';
        /** Integrity metadata used in Subresource Integrity checks [SRI] */
        readonly integrity?: string;
        /** Prevents execution in user agents that support module scripts */
        readonly nomodule?: boolean;
        /** Referrer policy for fetches initiated by the element */
        readonly referrerpolicy?: string;
        /** Address of the resource */
        readonly src?: string;
        /** Type of script */
        readonly type?: string;
      };
      readonly section: IntrinsicElement & {};
      readonly select: IntrinsicElement & {
        /** Hint for form autofill feature */
        readonly autocomplete?: string;
        /** Whether the form control is disabled */
        readonly disabled?: boolean;
        /** Associates the element with a form element */
        readonly form?: string;
        /** Whether to allow multiple values */
        readonly multiple?: boolean;
        /** Name of the element to use for form submission and in the form.elements API */
        readonly name?: string;
        /** Whether the control is required for form submission */
        readonly required?: boolean;
        /** Size of the control */
        readonly size?: number;
      };
      readonly slot: IntrinsicElement & {
        /** Name of shadow tree slot */
        readonly name?: string;
      };
      readonly small: IntrinsicElement & {};
      readonly source: IntrinsicElement & {
        /** Vertical dimension */
        readonly height?: number;
        /** Applicable media */
        readonly media?: string;
        /** Image sizes for different page layouts */
        readonly sizes?: string;
        /** Address of the resource */
        readonly src?: string;
        /** Images to use in different situations, e.g., high-resolution displays, small monitors, etc. */
        readonly srcset?: string;
        /** Type of embedded resource */
        readonly type?: string;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly span: IntrinsicElement & {};
      readonly strong: IntrinsicElement & {};
      readonly style: IntrinsicElement & {
        /** Whether the element is potentially render-blocking */
        readonly blocking?: string;
        /** Applicable media */
        readonly media?: string;
        /** CSS style sheet set name */
        readonly title?: string;
      };
      readonly sub: IntrinsicElement & {};
      readonly summary: IntrinsicElement & {};
      readonly sup: IntrinsicElement & {};
      readonly table: IntrinsicElement & {};
      readonly tbody: IntrinsicElement & {};
      readonly td: IntrinsicElement & {
        /** Number of columns that the cell is to span */
        readonly colspan?: number;
        /** The header cells for this cell */
        readonly headers?: string;
        /** Number of rows that the cell is to span */
        readonly rowspan?: number;
      };
      readonly template: IntrinsicElement & {};
      readonly textarea: IntrinsicElement & {
        /** Hint for form autofill feature */
        readonly autocomplete?: string;
        /** Maximum number of characters per line */
        readonly cols?: number;
        /** Name of form control to use for sending the element's directionality in form submission */
        readonly dirname?: string;
        /** Whether the form control is disabled */
        readonly disabled?: boolean;
        /** Associates the element with a form element */
        readonly form?: string;
        /** Maximum length of value */
        readonly maxlength?: number;
        /** Minimum length of value */
        readonly minlength?: number;
        /** Name of the element to use for form submission and in the form.elements API */
        readonly name?: string;
        /** User-visible label to be placed within the form control */
        readonly placeholder?: string;
        /** Whether to allow the value to be edited by the user */
        readonly readonly?: boolean;
        /** Whether the control is required for form submission */
        readonly required?: boolean;
        /** Number of lines to show */
        readonly rows?: number;
        /** How the value of the form control is to be wrapped for form submission */
        readonly wrap?: 'soft' | 'hard';
      };
      readonly tfoot: IntrinsicElement & {};
      readonly th: IntrinsicElement & {
        /** Alternative label to use for the header cell when referencing the cell in other contexts */
        readonly abbr?: string;
        /** Number of columns that the cell is to span */
        readonly colspan?: number;
        /** The header cells for this cell */
        readonly headers?: string;
        /** Number of rows that the cell is to span */
        readonly rowspan?: number;
        /** Specifies which cells the header cell applies to */
        readonly scope?: 'row' | 'col' | 'rowgroup' | 'colgroup';
      };
      readonly thead: IntrinsicElement & {};
      readonly time: IntrinsicElement & {
        /** Machine-readable value */
        readonly datetime?: string | number;
      };
      readonly title: IntrinsicElement & {};
      readonly tr: IntrinsicElement & {};
      readonly track: IntrinsicElement & {
        /** Enable the track if no other text track is more suitable */
        readonly default?: boolean;
        /** The type of text track */
        readonly kind?:
          | 'subtitles'
          | 'captions'
          | 'descriptions'
          | 'chapters'
          | 'metadata';
        /** User-visible label */
        readonly label?: string;
        /** Address of the resource */
        readonly src?: string;
        /** Language of the text track */
        readonly srclang?: string;
      };
      readonly u: IntrinsicElement & {};
      readonly ul: IntrinsicElement & {};
      readonly var: IntrinsicElement & {};
      readonly video: IntrinsicElement & {
        /** Hint that the media resource can be started automatically when the page is loaded */
        readonly autoplay?: boolean;
        /** Show user agent controls */
        readonly controls?: boolean;
        /** How the element handles crossorigin requests */
        readonly crossorigin?: 'anonymous' | 'use-credentials';
        /** Vertical dimension */
        readonly height?: number;
        /** Whether to loop the media resource */
        readonly loop?: boolean;
        /** Whether to mute the media resource by default */
        readonly muted?: boolean;
        /** Encourage the user agent to display video content within the element's playback area */
        readonly playsinline?: boolean;
        /** Poster frame to show prior to video playback */
        readonly poster?: string;
        /** Hints how much buffering the media resource will likely need */
        readonly preload?: 'none' | 'metadata' | 'auto';
        /** Address of the resource */
        readonly src?: string;
        /** Horizontal dimension */
        readonly width?: number;
      };
      readonly wbr: IntrinsicElement & {};
    }
  }
}
