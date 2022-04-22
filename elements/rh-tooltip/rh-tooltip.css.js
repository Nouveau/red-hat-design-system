import { css } from 'lit'

export default css`:host {
  display: block;
}

:host([hidden]) {
  display: none;
}

.pf-c-invoker {
  width: fit-content;
}

.pf-c-tooltip {
  display: block;
  position: absolute;
  z-index: 1;
}

.pf-c-tooltip.hidden {
  display: none;
}

.pf-c-tooltip {
  position: relative;
  position: var(--rh-product-trial-tooltip--Position, relative);
  max-width: 300px;
  max-width: var(--rh-product-trial-tooltip--MaxWidth, 300px);
  -webkit-box-shadow: rgba(3, 3, 3, 0.12) 0px 4px 8px 0px,
    rgba(3, 3, 3, 0.06) 0px 0px 4px;
  box-shadow: rgba(3, 3, 3, 0.12) 0px 4px 8px 0px,
    rgba(3, 3, 3, 0.06) 0px 0px 4px;
  -webkit-box-shadow: var(
    --rh-product-trial-tooltip--BoxShadow,
    rgba(3, 3, 3, 0.12) 0px 4px 8px 0px,
    rgba(3, 3, 3, 0.06) 0px 0px 4px
  );
  box-shadow: var(
    --rh-product-trial-tooltip--BoxShadow,
    rgba(3, 3, 3, 0.12) 0px 4px 8px 0px,
    rgba(3, 3, 3, 0.06) 0px 0px 4px
  );
}

.pf-c-tooltip__arrow {
  position: absolute;
  position: var(--rh-product-trial-tooltip__arrow--Postion, absolute);
  width: 15px;
  width: var(--rh-product-trial-tooltip__arrow--Width, 15px);
  height: 15px;
  height: var(--rh-product-trial-tooltip__arrow--Height, 15px);
  pointer-events: var(--rh-product-trial-tooltip--PointerEvents);
  background-color: #151515;
  background-color: var(--rh-product-trial-tooltip--BackgroundColor, #151515);
}

[data-popper-placement='top'] .pf-c-tooltip__arrow {
  bottom: 0;
  bottom: var(--rh-product-trial-tooltip__arrow--top--Bottom, 0);
  left: 50%;
  left: var(--rh-product-trial-tooltip__arrow--top--Left, 50%);
  -webkit-transform: translate(-50%, 50%) rotate(45deg);
  transform: translate(-50%, 50%) rotate(45deg);
  -webkit-transform: var(
    --rh-product-trial-tooltip__arrow--top--Transform,
    translate(-50%, 50%) rotate(45deg)
  );
  transform: var(
    --rh-product-trial-tooltip__arrow--top--Transform,
    translate(-50%, 50%) rotate(45deg)
  );
}

[data-popper-placement='bottom'] .pf-c-tooltip__arrow {
  left: 50%;
  left: var(--rh-product-trial-tooltip__arrow--bottom--Left, 50%);
  bottom: var(--rh-product-trial-tooltip__arrow--bottom--Bottom);
  -webkit-transform: translate(-50%, -50%) rotate(45deg);
  transform: translate(-50%, -50%) rotate(45deg);
  -webkit-transform: var(
    --rh-product-trial-tooltip__arrow--bottom--Transform,
    translate(-50%, -50%) rotate(45deg)
  );
  transform: var(
    --rh-product-trial-tooltip__arrow--bottom--Transform,
    translate(-50%, -50%) rotate(45deg)
  );
}

[data-popper-placement='left'] .pf-c-tooltip__arrow {
  top: 50%;
  top: var(--rh-product-trial-tooltip__arrow--left--Top, 50%);
  right: 0;
  right: var(--rh-product-trial-tooltip__arrow--left--Right, 0);
  -webkit-transform: translate(50%, -50%) rotate(45deg);
  transform: translate(50%, -50%) rotate(45deg);
  -webkit-transform: var(
    --rh-product-trial-tooltip__arrow--left--Transform,
    translate(50%, -50%) rotate(45deg)
  );
  transform: var(
    --rh-product-trial-tooltip__arrow--left--Transform,
    translate(50%, -50%) rotate(45deg)
  );
}

[data-popper-placement='right'] .pf-c-tooltip__arrow {
  left: 0;
  left: var(--rh-product-trial-tooltip__arrow--right--Left, 0);
  top: 50%;
  top: var(--rh-product-trial-tooltip__arrow--right--Top, 50%);
  -webkit-transform: translate(-50%, -50%) rotate(45deg);
  transform: translate(-50%, -50%) rotate(45deg);
  -webkit-transform: var(
    --rh-product-trial-tooltip__arrow--right--Transform,
    translate(-50%, -50%) rotate(45deg)
  );
  transform: var(
    --rh-product-trial-tooltip__arrow--right--Transform,
    translate(-50%, -50%) rotate(45deg)
  );
}

.pf-c-tooltip__content {
  position: relative;
  position: var(--rh-product-trial-tooltip__content--Position, relative);
  padding-top: 16px;
  padding-top: var(--rh-product-trial-tooltip__content--PaddingTop, 16px);
  padding-bottom: 16px;
  padding-bottom: var(--rh-product-trial-tooltip__content--PaddingBottom, 16px);
  padding-left: 16px;
  padding-left: var(--rh-product-trial-tooltip__content--PaddingLeft, 16px);
  padding-right: 16px;
  padding-right: var(--rh-product-trial-tooltip__content--PaddingRight, 16px);
  font-size: 14px;
  font-size: var(--rh-product-trial-tooltip__content--FontSize, 14px);
  color: white;
  color: var(--rh-product-trial-tooltip--Color, white);
  background-color: #151515;
  background-color: var(--rh-product-trial-tooltip--BackgroundColor, #151515);
  text-align: center;
  text-align: var(--rh-product-trial-tooltip__content--TextAlign, center);
  word-break: break-word;
  word-break: var(--rh-product-trial-tooltip__content--WordBreak, break-word);
  border-radius: 0;
  border-radius: var(--rh-product-trial-tooltip__content--BorderRadius, 0);
}

:host([theme='dark']) {
  --rh-product-trial-tooltip--Color: #151515;
  --rh-product-trial-tooltip--BackgroundColor: #fff;
  --rh-product-trial-tooltip--BoxShadow: var(--rh-product-trial-tooltip--BoxShadow--dark, none);
}`