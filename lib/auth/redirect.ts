import { redirect } from "next/navigation";
import { ROLE_HOMES } from "./constants";
import type { Role } from "@/types/auth";

export function redirectToRoleHome(role: Role) {
  redirect(ROLE_HOMES[role]);
}
