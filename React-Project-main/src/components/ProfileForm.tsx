// src/components/forms/ProfileForm.tsx
import { TextInput, Button } from "flowbite-react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { UserEditFormData } from "./../hooks/useEditProfile";
import { FaInfoCircle } from "react-icons/fa";

type ProfileFormProps = {
  register: UseFormRegister<UserEditFormData>;
  errors: FieldErrors<UserEditFormData>;
  handleSubmit: UseFormHandleSubmit<UserEditFormData>;
  onSubmit: (data: UserEditFormData) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
  onCancel,
}) => {
  // Helper function for error messages and form fields
  const FormField = ({
    name,
    label,
    placeholder,
    type = "text",
    helpText = "",
    options = {},
  }: {
    name: keyof UserEditFormData;
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    helpText?: string;
    options?: object;
  }) => (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <TextInput
        {...register(name, options)}
        type={type}
        placeholder={placeholder}
        color={errors[name] ? "failure" : "gray"}
      />
      {errors[name] ? (
        <p className="mt-1 text-sm text-red-500">{errors[name]?.message}</p>
      ) : helpText ? (
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          {helpText.startsWith("<icon>") ? <FaInfoCircle /> : null}
          {helpText.replace("<icon>", "")}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name="first"
          label="First Name"
          placeholder="First Name"
          required
        />
        <FormField
          name="middle"
          label="Middle Name"
          placeholder="Middle Name (optional)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name="last"
          label="Last Name"
          placeholder="Last Name"
          required
        />
        <FormField
          name="phone"
          label="Phone"
          placeholder="Phone"
          required
          helpText="<icon>Phone must be a valid Israeli phone number with at least 9 digits"
        />
      </div>

      <FormField name="email" label="Email" placeholder="Email" required />

      <FormField
        name="password"
        label="New Password"
        placeholder="New Password (leave empty to keep current)"
        type="password"
        helpText="Leave empty if you don't want to change your password"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name="imageUrl"
          label="Image URL"
          placeholder="Image URL (optional)"
        />
        <FormField
          name="imageAlt"
          label="Image Description"
          placeholder="Image Alt Text (optional)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField name="state" label="State" placeholder="State (optional)" />
        <FormField
          name="country"
          label="Country"
          placeholder="Country"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField name="city" label="City" placeholder="City" required />
        <FormField name="street" label="Street" placeholder="Street" required />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          name="houseNumber"
          label="House Number"
          placeholder="House Number"
          type="number"
          required
          options={{ valueAsNumber: true }}
        />
        <FormField
          name="zip"
          label="ZIP Code"
          placeholder="ZIP (optional)"
          type="number"
          options={{ valueAsNumber: true }}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          color="blue"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Updating..." : "Save Changes"}
        </Button>
        <Button
          color="light"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-1/3"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
