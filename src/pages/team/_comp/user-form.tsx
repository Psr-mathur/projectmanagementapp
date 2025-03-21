import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type TUserCreate } from "@/models/user.model";

type Props = {
  handleSubmit?: (formState: TUserCreate) => Promise<void>;
  data?: TUserCreate;
};

export function UserForm({ handleSubmit, data }: Props) {
  const [formState, setFormState] = useState<TUserCreate>({
    email: "",
    name: "",
    avatar: "",
    password: "",
  });

  useEffect(() => {
    if (data) setFormState(data);
  }, [data]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleSubmit) {
      await handleSubmit(formState);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4">
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}