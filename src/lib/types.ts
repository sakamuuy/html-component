export declare namespace nyaan {

  type Properties<T extends keyof HTMLElementTagNameMap> = {
    [K in keyof HTMLElementTagNameMap[T]]?: HTMLElementTagNameMap[T][K]
  }

  export type HTMLObj<T extends keyof HTMLElementTagNameMap> = {
    tagName: keyof HTMLElementTagNameMap
    attributes: Properties<T>
    children: Array<HTMLObj<keyof HTMLElementTagNameMap> | string>
  }

  // type Booleanish = boolean | 'true' | 'false'

  // type AriaRole =
  //   | 'alert'
  //   | 'alertdialog'
  //   | 'application'
  //   | 'article'
  //   | 'banner'
  //   | 'button'
  //   | 'cell'
  //   | 'checkbox'
  //   | 'columnheader'
  //   | 'combobox'
  //   | 'complementary'
  //   | 'contentinfo'
  //   | 'definition'
  //   | 'dialog'
  //   | 'directory'
  //   | 'document'
  //   | 'feed'
  //   | 'figure'
  //   | 'form'
  //   | 'grid'
  //   | 'gridcell'
  //   | 'group'
  //   | 'heading'
  //   | 'img'
  //   | 'link'
  //   | 'list'
  //   | 'listbox'
  //   | 'listitem'
  //   | 'log'
  //   | 'main'
  //   | 'marquee'
  //   | 'math'
  //   | 'menu'
  //   | 'menubar'
  //   | 'menuitem'
  //   | 'menuitemcheckbox'
  //   | 'menuitemradio'
  //   | 'navigation'
  //   | 'none'
  //   | 'note'
  //   | 'option'
  //   | 'presentation'
  //   | 'progressbar'
  //   | 'radio'
  //   | 'radiogroup'
  //   | 'region'
  //   | 'row'
  //   | 'rowgroup'
  //   | 'rowheader'
  //   | 'scrollbar'
  //   | 'search'
  //   | 'searchbox'
  //   | 'separator'
  //   | 'slider'
  //   | 'spinbutton'
  //   | 'status'
  //   | 'switch'
  //   | 'tab'
  //   | 'table'
  //   | 'tablist'
  //   | 'tabpanel'
  //   | 'term'
  //   | 'textbox'
  //   | 'timer'
  //   | 'toolbar'
  //   | 'tooltip'
  //   | 'tree'
  //   | 'treegrid'
  //   | 'treeitem'
  //   | (string & {})

  // export interface HTMLAttributes extends DOMAttributes {
  //   // Standard HTML Attributes
  //   accessKey?: string | undefined
  //   className?: string | undefined
  //   contentEditable?: Booleanish | 'inherit' | undefined
  //   contextMenu?: string | undefined
  //   dir?: string | undefined
  //   draggable?: Booleanish | undefined
  //   hidden?: boolean | undefined
  //   id?: string | undefined
  //   lang?: string | undefined
  //   placeholder?: string | undefined
  //   slot?: string | undefined
  //   spellCheck?: Booleanish | undefined
  //   style?: unknown | undefined
  //   tabIndex?: number | undefined
  //   title?: string | undefined
  //   translate?: 'yes' | 'no' | undefined

  //   // Unknown
  //   radioGroup?: string | undefined // <command>, <menuitem>

  //   // WAI-ARIA
  //   role?: AriaRole | undefined

  //   // RDFa Attributes
  //   about?: string | undefined
  //   datatype?: string | undefined
  //   inlist?: any
  //   prefix?: string | undefined
  //   property?: string | undefined
  //   resource?: string | undefined
  //   typeof?: string | undefined
  //   vocab?: string | undefined

  //   // Non-standard Attributes
  //   autoCapitalize?: string | undefined
  //   autoCorrect?: string | undefined
  //   autoSave?: string | undefined
  //   color?: string | undefined
  //   itemProp?: string | undefined
  //   itemScope?: boolean | undefined
  //   itemType?: string | undefined
  //   itemID?: string | undefined
  //   itemRef?: string | undefined
  //   results?: number | undefined
  //   security?: string | undefined
  //   unselectable?: 'on' | 'off' | undefined

  //   // Living Standard
  //   /**
  //    * Hints at the type of data that might be entered by the user while editing the element or its contents
  //    * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
  //    */
  //   inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined
  //   /**
  //    * Specify that a standard HTML element should behave like a defined custom built-in element
  //    * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
  //    */
  //   is?: string | undefined
  // }

  // interface DOMAttributes {
  //   dangerouslySetInnerHTML?:
  //     | {
  //         __html: string
  //       }
  //     | undefined

  //   // Clipboard Events
  //   onCopy?: unknown
  //   onCopyCapture?: unknown
  //   onCut?: unknown
  //   onCutCapture?: unknown
  //   onPaste?: unknown
  //   onPasteCapture?: unknown

  //   // Composition Events
  //   onCompositionEnd?: unknown
  //   onCompositionEndCapture?: unknown
  //   onCompositionStart?: unknown
  //   onCompositionStartCapture?: unknown
  //   onCompositionUpdate?: unknown
  //   onCompositionUpdateCapture?: unknown

  //   // Focus Events
  //   onFocus?: unknown
  //   onFocusCapture?: unknown
  //   onBlur?: unknown
  //   onBlurCapture?: unknown

  //   // Form Events
  //   onChange?: unknown
  //   onChangeCapture?: unknown
  //   onBeforeInput?: unknown
  //   onBeforeInputCapture?: unknown
  //   onInput?: unknown
  //   onInputCapture?: unknown
  //   onReset?: unknown
  //   onResetCapture?: unknown
  //   onSubmit?: unknown
  //   onSubmitCapture?: unknown
  //   onInvalid?: unknown
  //   onInvalidCapture?: unknown

  //   // Image Events
  //   onLoad?: unknown
  //   onLoadCapture?: unknown
  //   onError?: unknown
  //   onErrorCapture?: unknown

  //   // Keyboard Events
  //   onKeyDown?: unknown
  //   onKeyDownCapture?: unknown
  //   onKeyPress?: unknown
  //   onKeyPressCapture?: unknown
  //   onKeyUp?: unknown
  //   onKeyUpCapture?: unknown

  //   // Media Events
  //   onAbort?: unknown
  //   onAbortCapture?: unknown
  //   onCanPlay?: unknown
  //   onCanPlayCapture?: unknown
  //   onCanPlayThrough?: unknown
  //   onCanPlayThroughCapture?: unknown
  //   onDurationChange?: unknown
  //   onDurationChangeCapture?: unknown
  //   onEmptied?: unknown
  //   onEmptiedCapture?: unknown
  //   onEncrypted?: unknown
  //   onEncryptedCapture?: unknown
  //   onEnded?: unknown
  //   onEndedCapture?: unknown
  //   onLoadedData?: unknown
  //   onLoadedDataCapture?: unknown
  //   onLoadedMetadata?: unknown
  //   onLoadedMetadataCapture?: unknown
  //   onLoadStart?: unknown
  //   onLoadStartCapture?: unknown
  //   onPause?: unknown
  //   onPauseCapture?: unknown
  //   onPlay?: unknown
  //   onPlayCapture?: unknown
  //   onPlaying?: unknown
  //   onPlayingCapture?: unknown
  //   onProgress?: unknown
  //   onProgressCapture?: unknown
  //   onRateChange?: unknown
  //   onRateChangeCapture?: unknown
  //   onSeeked?: unknown
  //   onSeekedCapture?: unknown
  //   onSeeking?: unknown
  //   onSeekingCapture?: unknown
  //   onStalled?: unknown
  //   onStalledCapture?: unknown
  //   onSuspend?: unknown
  //   onSuspendCapture?: unknown
  //   onTimeUpdate?: unknown
  //   onTimeUpdateCapture?: unknown
  //   onVolumeChange?: unknown
  //   onVolumeChangeCapture?: unknown
  //   onWaiting?: unknown
  //   onWaitingCapture?: unknown

  //   // MouseEvents
  //   onAuxClick?: unknown
  //   onAuxClickCapture?: unknown
  //   onClick?: unknown
  //   onClickCapture?: unknown
  //   onContextMenu?: unknown
  //   onContextMenuCapture?: unknown
  //   onDoubleClick?: unknown
  //   onDoubleClickCapture?: unknown
  //   onDrag?: unknown
  //   onDragCapture?: unknown
  //   onDragEnd?: unknown
  //   onDragEndCapture?: unknown
  //   onDragEnter?: unknown
  //   onDragEnterCapture?: unknown
  //   onDragExit?: unknown
  //   onDragExitCapture?: unknown
  //   onDragLeave?: unknown
  //   onDragLeaveCapture?: unknown
  //   onDragOver?: unknown
  //   onDragOverCapture?: unknown
  //   onDragStart?: unknown
  //   onDragStartCapture?: unknown
  //   onDrop?: unknown
  //   onDropCapture?: unknown
  //   onMouseDown?: unknown
  //   onMouseDownCapture?: unknown
  //   onMouseEnter?: unknown
  //   onMouseLeave?: unknown
  //   onMouseMove?: unknown
  //   onMouseMoveCapture?: unknown
  //   onMouseOut?: unknown
  //   onMouseOutCapture?: unknown
  //   onMouseOver?: unknown
  //   onMouseOverCapture?: unknown
  //   onMouseUp?: unknown
  //   onMouseUpCapture?: unknown

  //   // Selection Events
  //   onSelect?: unknown
  //   onSelectCapture?: unknown

  //   // Touch Events
  //   onTouchCancel?: unknown
  //   onTouchCancelCapture?: unknown
  //   onTouchEnd?: unknown
  //   onTouchEndCapture?: unknown
  //   onTouchMove?: unknown
  //   onTouchMoveCapture?: unknown
  //   onTouchStart?: unknown
  //   onTouchStartCapture?: unknown

  //   // Pointer Events
  //   onPointerDown?: unknown
  //   onPointerDownCapture?: unknown
  //   onPointerMove?: unknown
  //   onPointerMoveCapture?: unknown
  //   onPointerUp?: unknown
  //   onPointerUpCapture?: unknown
  //   onPointerCancel?: unknown
  //   onPointerCancelCapture?: unknown
  //   onPointerEnter?: unknown
  //   onPointerEnterCapture?: unknown
  //   onPointerLeave?: unknown
  //   onPointerLeaveCapture?: unknown
  //   onPointerOver?: unknown
  //   onPointerOverCapture?: unknown
  //   onPointerOut?: unknown
  //   onPointerOutCapture?: unknown
  //   onGotPointerCapture?: unknown
  //   onGotPointerCaptureCapture?: unknown
  //   onLostPointerCapture?: unknown
  //   onLostPointerCaptureCapture?: unknown

  //   // UI Events
  //   onScroll?: unknown
  //   onScrollCapture?: unknown

  //   // Wheel Events
  //   onWheel?: unknown
  //   onWheelCapture?: unknown

  //   // Animation Events
  //   onAnimationStart?: unknown
  //   onAnimationStartCapture?: unknown
  //   onAnimationEnd?: unknown
  //   onAnimationEndCapture?: unknown
  //   onAnimationIteration?: unknown
  //   onAnimationIterationCapture?: unknown

  //   // Transition Events
  //   onTransitionEnd?: unknown
  //   onTransitionEndCapture?: unknown
  // }
}
