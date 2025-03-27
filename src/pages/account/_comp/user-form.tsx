import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type TUserUpdate, type TUserCreate } from "@/models/user.model";
import { useSession } from 'next-auth/react';
import { api } from '@/utils/api';

export function UserForm() {
  const { data: session } = useSession();
  const { data: user, isLoading } = api.user.getUserById.useQuery({ id: session?.user?.id ?? "" }, {
    enabled: session !== null
  });
  const userUpdateMutation = api.user.updateUser.useMutation();
  const [formState, setFormState] = useState<TUserUpdate>({
    id: "",
    email: "",
    name: "",
    avatar: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormState({
        id: user.id,
        email: user.email,
        name: user.name ?? "",
        avatar: user.avatar ?? "",
        password: user.password,
      });
    }
  }, [user]);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userUpdateMutation.mutateAsync(formState);
      alert("User updated successfully");
    } catch (error) {
      alert("Error updating user");
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4 w-1/2">
      <div className="card-body">
        <form onSubmit={onSubmit} className="space-y-2">
          {/* Email */}
          <Input
            label="Email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            placeholder="Enter email address"
            type="email"
            required
            disabled={true}
          />

          {/* Name */}
          <Input
            label="Name"
            value={formState.name ?? ""}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            placeholder="Enter name (optional)"
          />

          {/* Avatar */}
          <Input
            label="Avatar URL"
            value={formState.avatar ?? ""}
            onChange={(e) => setFormState({ ...formState, avatar: e.target.value })}
            placeholder="Enter avatar URL (optional)"
          />

          {/* Password */}
          <Input
            label="Password"
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
            placeholder="Enter password"
            type="password"
            required
          />

          {/* Submit Button */}
          <Button variant="primary" type="submit" disabled={isLoading || userUpdateMutation.isPending}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}