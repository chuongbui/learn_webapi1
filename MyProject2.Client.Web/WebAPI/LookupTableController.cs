using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using Xomega.Framework.Lookup;

namespace MyProject2.Client.Web
{
    public class LookupTableController : ApiController
    {
        // GET api/<controller>/5
        public HttpResponseMessage Get(string id)
        {
            LookupTable tbl = LookupCache.Get(LookupCache.Global).GetLookupTable(id);
            var response = tbl == null ?
                Request.CreateResponse<string>(HttpStatusCode.NotFound,
                    string.Format("Lookup table '{0}' is not found in the global lookup cache.", id)) :
                Request.CreateResponse<LookupTable>(HttpStatusCode.OK, tbl);
            response.Headers.CacheControl = new CacheControlHeaderValue()
            {
                Public = true,
                MaxAge = new TimeSpan(0, 0, 30)
            };
            return response;
        }

        // DELETE api/<controller>/5
        public void Delete(string id)
        {
            LookupCache.Get(LookupCache.Global).RemoveLookupTable(id);
        }
    }
}