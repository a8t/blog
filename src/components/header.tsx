import React, { useState } from "react"

import { useMenuTriggerState } from "@react-stately/menu"
import { useButton } from "@react-aria/button"
import { useMenu, useMenuItem, useMenuTrigger } from "@react-aria/menu"
import { useTreeState } from "@react-stately/tree"
import { Item } from "@react-stately/collections"
import { mergeProps } from "@react-aria/utils"
import { FocusScope } from "@react-aria/focus"
import { useFocus } from "@react-aria/interactions"
import { useOverlay, DismissButton } from "@react-aria/overlays"

import Hat from "./hat"
import { Link } from "gatsby"

function MenuButton(props) {
  // Create state based on the incoming props
  const state = useMenuTriggerState(props)

  // Get props for the menu trigger and menu elements
  const ref = React.useRef()
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref)

  // Get props for the button based on the trigger props from useMenuTrigger
  const { buttonProps } = useButton(menuTriggerProps, ref)

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button {...buttonProps} ref={ref} style={{ height: 30, fontSize: 14 }}>
        {props.label}
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </button>
      {state.isOpen && (
        <MenuPopup
          {...props}
          domProps={menuProps}
          autoFocus={state.focusStrategy}
          onClose={() => state.close()}
        />
      )}
    </div>
  )
}

function MenuPopup(props) {
  // Create menu state based on the incoming props
  const state = useTreeState({ ...props, selectionMode: "none" })

  // Get props for the menu element
  const ref = React.useRef()
  const { menuProps } = useMenu(props, state, ref)

  // Handle events that should cause the menu to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const overlayRef = React.useRef()
  const { overlayProps } = useOverlay(
    {
      onClose: props.onClose,
      shouldCloseOnBlur: true,
      isOpen: true,
      isDismissable: true,
    },
    overlayRef
  )

  // Wrap in <FocusScope> so that focus is restored back to the
  // trigger when the menu is closed. In addition, add hidden
  // <DismissButton> components at the start and end of the list
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <div {...overlayProps} ref={overlayRef}>
        <DismissButton onDismiss={props.onClose} />
        <ul
          {...mergeProps(menuProps, props.domProps)}
          ref={ref}
          style={{
            position: "absolute",
            width: "100%",
            margin: "4px 0 0 0",
            padding: 0,
            listStyle: "none",
            border: "1px solid gray",
            background: "lightgray",
          }}
        >
          {[...state.collection].map(item => (
            <MenuItem
              key={item.key}
              item={item}
              state={state}
              onAction={props.onAction}
              onClose={props.onClose}
            />
          ))}
        </ul>
        <DismissButton onDismiss={props.onClose} />
      </div>
    </FocusScope>
  )
}

function MenuItem({ item, state, onAction, onClose }) {
  // Get props for the menu item element
  const ref = React.useRef()
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled: item.isDisabled,
      onAction,
      onClose,
    },
    state,
    ref
  )

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  const [isFocused, setFocused] = React.useState(false)
  const { focusProps } = useFocus({ onFocusChange: setFocused })

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      style={{
        background: isFocused ? "gray" : "transparent",
        color: isFocused ? "white" : "black",
        padding: "2px 5px",
        outline: "none",
        cursor: "pointer",
      }}
    >
      {item.rendered}
    </li>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <div className="relative bg-white sticky top-0 shadow-md">
        <div className="container m-auto flex justify-between items-center px-4 py-4 sm:px-6 sm:justify-start md:space-x-10">
          <div className="lg:w-0 lg:flex-1">
            <Link to="/" className="flex">
              <Hat className="w-12" />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              to="/"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              Posts
            </Link>
            <Link
              to="/chords"
              className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
            >
              Song chords
            </Link>
          </nav>
        </div>
        {/*
      Mobile menu, show/hide based on mobile menu state.
  
      Entering: "duration-200 ease-out"
  From: "opacity-0 scale-95"
  To: "opacity-100 scale-100"
      Leaving: "duration-100 ease-in"
  From: "opacity-100 scale-100"
  To: "opacity-0 scale-95"
    */}
        {isMenuOpen && (
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg">
              <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <nav className="grid grid-cols-1 gap-7">
                      <a
                        href="#"
                        className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Analytics
                        </div>
                      </a>
                      <a
                        href="#"
                        className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            />
                          </svg>
                        </div>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Engagement
                        </div>
                      </a>
                      <a
                        href="#"
                        className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Security
                        </div>
                      </a>
                      <a
                        href="#"
                        className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                          </svg>
                        </div>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Integrations
                        </div>
                      </a>
                      <a
                        href="#"
                        className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                        </div>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Automations
                        </div>
                      </a>
                      <a
                        href="#"
                        className="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Reports
                        </div>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </>
  )
}
