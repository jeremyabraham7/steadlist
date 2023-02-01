import * as Prisma from "@prisma/client"
import { Field, ObjectType } from "type-graphql"

import { Role } from "@generated"

import { BaseModel } from "../shared/base.model"
import { UseIsCurrentUser } from "./middleware/UseIsCurrentUser"

@ObjectType()
export class User extends BaseModel implements Prisma.User {
  @UseIsCurrentUser()
  @Field({ nullable: true }) email: string

  password: string

  @Field({ nullable: true }) firstName: string

  @Field({ nullable: true }) lastName: string

  @Field(() => Role) role: Prisma.Role
}
