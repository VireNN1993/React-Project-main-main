// src/components/forms/CardForm.tsx
import { TextInput, Button, Textarea } from "flowbite-react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { CreateCardFormData } from ".././types/Card";
import { FaInfoCircle } from "react-icons/fa";

type CardFormProps = {
  register: UseFormRegister<CreateCardFormData>;
  errors: FieldErrors<CreateCardFormData>;
  onSubmit: (data: CreateCardFormData) => Promise<boolean>;
  handleSubmit: UseFormHandleSubmit<CreateCardFormData>;
  isSubmitting: boolean;
  submitLabel: string;
  submittingLabel: string;
  onCancel: () => void;
};

const CardForm: React.FC<CardFormProps> = ({
  register,
  errors,
  onSubmit,
  handleSubmit,
  isSubmitting,
  submitLabel,
  submittingLabel,
  onCancel,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <TextInput {...register("title")} placeholder="Title" />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <TextInput {...register("subtitle")} placeholder="Subtitle" />
        {errors.subtitle && (
          <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
        )}
      </div>

      <div>
        <Textarea
          {...register("description")}
          placeholder="Description"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <TextInput {...register("phone")} placeholder="Phone" />
        {errors.phone ? (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        ) : (
          <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <FaInfoCircle />
            Phone must be a valid Israeli phone number with at least 9 digits
          </p>
        )}
      </div>

      <div>
        <TextInput {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <TextInput {...register("web")} placeholder="Website (optional)" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          {...register("imageUrl")}
          placeholder="Image URL (optional)"
        />
        <TextInput
          {...register("imageAlt")}
          placeholder="Image Alt (optional)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput {...register("state")} placeholder="State (optional)" />
        <div>
          <TextInput {...register("country")} placeholder="Country" />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <TextInput {...register("city")} placeholder="City" />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
        <div>
          <TextInput {...register("street")} placeholder="Street" />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <TextInput
            {...register("houseNumber")}
            type="number"
            placeholder="House Number"
          />
          {errors.houseNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.houseNumber.message}
            </p>
          )}
        </div>
        <TextInput
          {...register("zip")}
          type="number"
          placeholder="ZIP (optional)"
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          color="blue"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? submittingLabel : submitLabel}
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

export default CardForm;
