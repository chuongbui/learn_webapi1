//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by an Xomega.Net generator.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using MyProject2.Enumerations;
using MyProject2.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using Xomega.Framework;
using Xomega.Framework.Services;

namespace MyProject2.Entities.Services
{
    public class CarsService : ICarsService
    {
        public CarsService()
        {
        }

        public virtual Cars_ReadOutput Read(int _id)
        {
            Cars_ReadOutput res = new Cars_ReadOutput();
            using (MyProject2Entities ctx = new MyProject2Entities())
            {
                Cars obj = ctx.Cars.Find(_id);
                if (obj == null)
                {
                    ErrorList.Current.CriticalError(HttpStatusCode.NotFound, "Cars with id {0} not found", _id);
                }
                ServiceUtil.CopyProperties(obj, res);
            }
            return res;
        }

        public virtual Cars_CreateOutput Create(Cars_CreateInput _data)
        {
            Cars_CreateOutput res = new Cars_CreateOutput();
            using (MyProject2Entities ctx = new MyProject2Entities())
            {
                EntityState state = EntityState.Added;
                Cars obj = new Cars();
                var entry = ctx.Entry(obj);
                entry.State = state;
                entry.CurrentValues.SetValues(_data);

                ErrorList.Current.AbortIfHasErrors(HttpStatusCode.BadRequest);
                ctx.SaveChanges();
                ServiceUtil.CopyProperties(obj, res);
            }
            return res;
        }

        public virtual void Update(int _id, Cars_UpdateInput_Data _data)
        {
            using (MyProject2Entities ctx = new MyProject2Entities())
            {
                Cars obj = ctx.Cars.Find(_id);
                if (obj == null)
                {
                    ErrorList.Current.CriticalError(HttpStatusCode.NotFound, "Cars with id {0} not found", _id);
                }
                var entry = ctx.Entry(obj);
                entry.CurrentValues.SetValues(_data);

                ErrorList.Current.AbortIfHasErrors(HttpStatusCode.BadRequest);
                ctx.SaveChanges();
            }
        }

        public virtual void Delete(int _id)
        {
            using (MyProject2Entities ctx = new MyProject2Entities())
            {
                EntityState state = EntityState.Deleted;
                Cars obj = ctx.Cars.Find(_id);
                if (obj == null)
                {
                    ErrorList.Current.CriticalError(HttpStatusCode.NotFound, "Cars with id {0} not found", _id);
                }
                var entry = ctx.Entry(obj);
                entry.State = state;

                ErrorList.Current.AbortIfHasErrors(HttpStatusCode.BadRequest);
                ctx.SaveChanges();
            }
        }

        public virtual IEnumerable<Cars_ReadListOutput> ReadList(Cars_ReadListInput_Criteria _criteria)
        {
            IEnumerable<Cars_ReadListOutput> res = null;
            using (MyProject2Entities ctx = new MyProject2Entities())
            {
                var qry = from obj in ctx.Cars
                          select new Cars_ReadListOutput() {
                              Id = obj.Id,
                              Name = obj.Name,
                              Quantity = obj.Quantity,
                              Type = obj.Type,
                          };

                #region Filter criteria
                if (_criteria != null)
                {

                    #region Name
                    if (_criteria.NameOperator != null)
                    {
                        switch (_criteria.NameOperator)
                        {
                            case Operators.IsNull:
                                qry = qry.Where(o => o.Name == null); break;
                            case Operators.IsNotNull:
                                qry = qry.Where(o => o.Name != null); break;
                            case Operators.IsEqualTo:
                                qry = qry.Where(o => o.Name == _criteria.Name); break;
                            case Operators.IsNotEqualTo:
                                qry = qry.Where(o => o.Name != _criteria.Name); break;
                            case Operators.Contains:
                                qry = qry.Where(o => o.Name.Contains(_criteria.Name)); break;
                            case Operators.DoesNotContain:
                                qry = qry.Where(o => !o.Name.Contains(_criteria.Name)); break;
                            default:
                                ErrorList.Current.AddError("Unsupported operator {0} for the Name.", _criteria.NameOperator); break;
                        }
                    }
                    #endregion

                    #region Quantity
                    if (_criteria.QuantityOperator != null)
                    {
                        switch (_criteria.QuantityOperator)
                        {
                            case Operators.IsNull:
                                qry = qry.Where(o => o.Quantity == null); break;
                            case Operators.IsNotNull:
                                qry = qry.Where(o => o.Quantity != null); break;
                            case Operators.IsEqualTo:
                                qry = qry.Where(o => o.Quantity == _criteria.Quantity); break;
                            case Operators.IsNotEqualTo:
                                qry = qry.Where(o => o.Quantity != _criteria.Quantity); break;
                            case Operators.IsLessThan:
                                qry = qry.Where(o => o.Quantity < _criteria.Quantity); break;
                            case Operators.IsNotLessThan:
                                qry = qry.Where(o => o.Quantity >= _criteria.Quantity); break;
                            case Operators.IsGreaterThan:
                                qry = qry.Where(o => o.Quantity > _criteria.Quantity); break;
                            case Operators.IsNotGreaterThan:
                                qry = qry.Where(o => o.Quantity <= _criteria.Quantity); break;
                            case Operators.IsBetween:
                                qry = qry.Where(o => o.Quantity >= _criteria.Quantity && o.Quantity <= _criteria.Quantity2); break;
                            default:
                                ErrorList.Current.AddError("Unsupported operator {0} for the Quantity.", _criteria.QuantityOperator); break;
                        }
                    }
                    #endregion

                    #region Type
                    if (_criteria.TypeOperator != null)
                    {
                        switch (_criteria.TypeOperator)
                        {
                            case Operators.IsNull:
                                qry = qry.Where(o => o.Type == null); break;
                            case Operators.IsNotNull:
                                qry = qry.Where(o => o.Type != null); break;
                            case Operators.IsEqualTo:
                                qry = qry.Where(o => o.Type == _criteria.Type); break;
                            case Operators.IsNotEqualTo:
                                qry = qry.Where(o => o.Type != _criteria.Type); break;
                            case Operators.Contains:
                                qry = qry.Where(o => o.Type.Contains(_criteria.Type)); break;
                            case Operators.DoesNotContain:
                                qry = qry.Where(o => !o.Type.Contains(_criteria.Type)); break;
                            default:
                                ErrorList.Current.AddError("Unsupported operator {0} for the Type.", _criteria.TypeOperator); break;
                        }
                    }
                    #endregion
                }
                #endregion

                ErrorList.Current.AbortIfHasErrors(HttpStatusCode.BadRequest);
                res = qry.ToList();
            }
            return res;
        }

  }
  
  
}