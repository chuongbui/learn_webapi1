//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by an Xomega.Net generator.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization;
using System.ServiceModel.Web;
using System.Web.Http;
using Xomega.Framework;

namespace MyProject2.Services
{
    #region CarsController

    public partial class CarsController : ApiController
    {

        ///<summary>
        /// Reads the values of a Cars object by its key.
        ///</summary>
        [Route("cars/{_id}")]
        [HttpGet]
        public HttpResponseMessage Read([FromUri]int _id)
        {
            HttpResponseMessage response = Request.CreateResponse();
            try
            {
                ICarsService svc = DI.Resolve<ICarsService>();
                Cars_ReadOutput output = svc.Read(_id);
                response = Request.CreateResponse<Cars_ReadOutput>(output);
            }
            catch (WebFaultException<ErrorList> wfe)
            {
                response = Request.CreateResponse<ErrorList>(wfe.Detail);
                response.StatusCode = wfe.StatusCode;
            }
            catch (Exception ex)
            {
                WebFaultException wfe = ex as WebFaultException;
                response = Request.CreateErrorResponse(wfe != null ? wfe.StatusCode : HttpStatusCode.InternalServerError, ex);
            }
            return response;
        }

        ///<summary>
        /// Creates a new Cars object using the specified data.
        ///</summary>
        [Route("cars")]
        [HttpPost]
        public HttpResponseMessage Create([FromBody]Cars_CreateInput _data)
        {
            HttpResponseMessage response = Request.CreateResponse();
            try
            {
                ICarsService svc = DI.Resolve<ICarsService>();
                Cars_CreateOutput output = svc.Create(_data);
                response = Request.CreateResponse<Cars_CreateOutput>(output);
            }
            catch (WebFaultException<ErrorList> wfe)
            {
                response = Request.CreateResponse<ErrorList>(wfe.Detail);
                response.StatusCode = wfe.StatusCode;
            }
            catch (Exception ex)
            {
                WebFaultException wfe = ex as WebFaultException;
                response = Request.CreateErrorResponse(wfe != null ? wfe.StatusCode : HttpStatusCode.InternalServerError, ex);
            }
            return response;
        }

        ///<summary>
        /// Updates existing Cars object using the specified data.
        ///</summary>
        [Route("cars/{_id}")]
        [HttpPut]
        public HttpResponseMessage Update([FromUri]int _id, [FromBody]Cars_UpdateInput_Data _data)
        {
            HttpResponseMessage response = Request.CreateResponse();
            try
            {
                ICarsService svc = DI.Resolve<ICarsService>();
                svc.Update(_id, _data);
            }
            catch (WebFaultException<ErrorList> wfe)
            {
                response = Request.CreateResponse<ErrorList>(wfe.Detail);
                response.StatusCode = wfe.StatusCode;
            }
            catch (Exception ex)
            {
                WebFaultException wfe = ex as WebFaultException;
                response = Request.CreateErrorResponse(wfe != null ? wfe.StatusCode : HttpStatusCode.InternalServerError, ex);
            }
            return response;
        }

        ///<summary>
        /// Deletes the specified Cars object.
        ///</summary>
        [Route("cars/{_id}")]
        [HttpDelete]
        public HttpResponseMessage Delete([FromUri]int _id)
        {
            HttpResponseMessage response = Request.CreateResponse();
            try
            {
                ICarsService svc = DI.Resolve<ICarsService>();
                svc.Delete(_id);
            }
            catch (WebFaultException<ErrorList> wfe)
            {
                response = Request.CreateResponse<ErrorList>(wfe.Detail);
                response.StatusCode = wfe.StatusCode;
            }
            catch (Exception ex)
            {
                WebFaultException wfe = ex as WebFaultException;
                response = Request.CreateErrorResponse(wfe != null ? wfe.StatusCode : HttpStatusCode.InternalServerError, ex);
            }
            return response;
        }

        ///<summary>
        /// Reads a list of Cars objects based on the specified criteria.
        ///</summary>
        [Route("cars")]
        [HttpGet]
        public HttpResponseMessage ReadList([FromUri]Cars_ReadListInput_Criteria _criteria)
        {
            HttpResponseMessage response = Request.CreateResponse();
            try
            {
                ICarsService svc = DI.Resolve<ICarsService>();
                IEnumerable<Cars_ReadListOutput> output = svc.ReadList(_criteria);
                response = Request.CreateResponse<IEnumerable<Cars_ReadListOutput>>(output);
            }
            catch (WebFaultException<ErrorList> wfe)
            {
                response = Request.CreateResponse<ErrorList>(wfe.Detail);
                response.StatusCode = wfe.StatusCode;
            }
            catch (Exception ex)
            {
                WebFaultException wfe = ex as WebFaultException;
                response = Request.CreateErrorResponse(wfe != null ? wfe.StatusCode : HttpStatusCode.InternalServerError, ex);
            }
            return response;
        }

    }
    #endregion

}