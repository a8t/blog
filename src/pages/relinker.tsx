import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import _ from "lodash"
import classNames from "classnames"
import { useCopyToClipboard } from "react-use"
import { useForm, useField } from "react-form"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Listing from "../components/listing"
import Header from "../components/header"
import { FaClipboard, FaClipboardCheck } from "react-icons/fa"

const useRedirectBasedOnQuery = () => {
  useEffect(() => {
    const url = new URLSearchParams(location.search).get("link")

    if (url) {
      window.location.replace(url)
    }
  }, [])
}

const URLField = () => {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("url", {
    validate: url => {
      try {
        new URL(url)

        return false
      } catch (e) {
        return "Invalid URL. Maybe you forgot http:// or https://"
      }
    },
  })

  return (
    <div className="mt-1 flex rounded-md shadow-sm flex-col">
      {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
    https://
  </span> */}
      <input
        {...getInputProps()}
        id="company_website"
        aria-invalid={error}
        className={classNames(
          "form-input flex-1 block max-w-fullrounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5",
          {
            "shadow-outline-red": error,
          },
          { "shadow-outline-green": isTouched }
        )}
        placeholder="https://www.example.com"
      />
      <span className="text-red-400 text-xs mt-2">{error}</span>
    </div>
  )
}

const Relinker = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  useRedirectBasedOnQuery()

  const [state, copyToClipboard] = useCopyToClipboard()

  const Clipboard = state.value ? FaClipboardCheck : FaClipboard

  const {
    Form,
    meta: { isSubmitting, canSubmit },
    values,
    handleSubmit,
  } = useForm({
    onSubmit: async (values, instance) => {
      const redirectedLink = location.href + "?link=" + values.url
      copyToClipboard(redirectedLink)
    },
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <Layout location={location} title={siteTitle}>
        <SEO title="April Theses" />
        <div className="md:grid md:grid-cols-3 md:gap-6 mt-8">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Relinker
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Enter a link that you want this webpage to redirect to.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Form action="#" method="POST" onSubmit={e => e.preventDefault()}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company_website"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Website
                      </label>
                      <URLField />
                    </div>
                  </div>
                  {/* <div className="mt-6">
                    <label
                      htmlFor="about"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      About
                    </label>
                    <div className="rounded-md shadow-sm">
                      <textarea
                        id="about"
                        rows={3}
                        className="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="you@example.com"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div> */}
                </div>
                <div className="px-4 py-3 bg-gray-50  sm:px-6">
                  {/* Your redirecting link: */}
                  {values.url && canSubmit ? (
                    <div className="mb-8">
                      <h5>Redirecting link</h5>
                      <span className="text-xs text-gray-400">
                        {location.href + "?link="}
                      </span>
                      {values.url}
                    </div>
                  ) : null}
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      onClick={handleSubmit}
                      className={classNames(
                        "inline-flex items-center justify-center",
                        "py-2 px-4",
                        "border border-transparent rounded-md",
                        "text-sm leading-5 font-medium text-teal-50",
                        "bg-teal-600 hover:bg-teal-500 active:bg-teal-700",
                        "focus:outline-none focus:border-teal-700 focus:shadow-outline-teal",
                        "transition duration-150 ease-in-out",
                        "disabled:opacity-25 disabled:pointer-events-none"
                      )}
                    >
                      <Clipboard className="text-teal-50 mr-2 h-4" />{" "}
                      <span>Copy</span>
                    </button>
                  </span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Relinker

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
