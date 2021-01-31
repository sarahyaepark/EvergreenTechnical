import graphene
from graphene import ObjectType, String, Schema
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.user_model import UserModel
from models.vendor_model import VendorModel

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel


class Vendor(SQLAlchemyObjectType):
    class Meta:
        model = VendorModel


class Query(ObjectType):
    users = graphene.List(User)
    user = graphene.Field(User, id=graphene.Int())
    vendors = graphene.List(Vendor)
    vendorsCategory = graphene.List(Vendor, category=graphene.String())
    vendorsRisk = graphene.List(Vendor, risk=graphene.String())
    vendorsStatus = graphene.List(Vendor, status=graphene.String())
    vendor = graphene.Field(Vendor, id=graphene.Int())

    def resolve_users(root, info):
        query = User.get_query(info)  # SQLAlchemy query
        return query.all()

    def resolve_user(root, info, id):
        query = User.get_query(info)
        return query.filter(UserModel.id == id).first()

    def resolve_vendors(root, info):
        query = Vendor.get_query(info)
        return query.all()

    def resolve_vendorsCategory(root, info, category):
        query = Vendor.get_query(info)
        return query.filter(VendorModel.category==category)

    def resolve_vendorsRisk(root, info, risk):
        query = Vendor.get_query(info)
        return query.filter(VendorModel.risk==risk)

    def resolve_vendorsStatus(root, info, status):
        query = Vendor.get_query(info)
        return query.filter(VendorModel.status==status)

    def resolve_vendor(root, info,id):
        query = Vendor.get_query(info)
        return query.filter(VendorModel.id == id).first()

class UpdateVendorCategory(graphene.Mutation):
  class Arguments:
    vendorId = graphene.Int()
    category = String()
  
  vendor = graphene.Field(Vendor)
  @classmethod
  def mutate(cls,root,info,vendorId, category):
    vendor = Vendor.get_query(info)
    query = vendor.filter(VendorModel.id == vendorId).first()
    query.category = category
    query.save()
    return UpdateVendorCategory(vendor=query)

class UpdateVendorStatus(graphene.Mutation):
  class Arguments:
    vendorId = graphene.Int()
    status = String()
  
  vendor = graphene.Field(Vendor)
  @classmethod
  def mutate(cls,root,info,vendorId, status):
    vendor = Vendor.get_query(info)
    query = vendor.filter(VendorModel.id == vendorId).first()
    query.status = status
    query.save()
    return UpdateVendorStatus(vendor=query)

class Mutation(graphene.ObjectType):
  update_vendor_category = UpdateVendorCategory.Field()
  update_vendor_status = UpdateVendorStatus.Field()

schema = Schema(query=Query, mutation=Mutation)
