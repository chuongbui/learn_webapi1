using System;
using System.Web.Optimization;

namespace MyProject2.Client.Web
{
    static class WebOptimizationConfig
    {
        /// <summary>
        /// Registers web optimization bundles.
        /// </summary>
        public static void RegisterBundles()
        {
            BundleCollection bundles = BundleTable.Bundles;

            SetDefaultIgnorePatterns(bundles.IgnoreList);

            // css bundle
            bundles.Add(new StyleBundle("~/Content/css")
                .Include("~/Content/css/Spa.css")
                .Include("~/Content/css/Xomega.css")
                .Include("~/Content/durandal.css")
              //* add more folders/files here
              );

            // script bundle
            bundles.Add(new ScriptBundle("~/Scripts/include")
                .Include("~/Scripts/jquery-{version}.js")
              //* add more folders/files here
              );
        }

        /// <summary>
        /// Sets default ignore patterns for web optimization bundles.
        /// </summary>
        private static void SetDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            ignoreList.Clear();

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            //* add more patterns here
        }
    }
}