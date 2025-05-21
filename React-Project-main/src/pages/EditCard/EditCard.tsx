// src/pages/EditCard/EditCardPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { TextInput, Button, Textarea, Spinner } from "flowbite-react";
import { useEditCard } from "../../hooks/useEditCard";
import { CreateCardFormData } from "../../types/Card";

const EditCardPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    loading,
    error,
    onSubmit,
  } = useEditCard(id);

  const onFormSubmit = async (formData: CreateCardFormData) => {
    const success = await onSubmit(formData);
    if (success) {
      // Navigate after a short delay
      setTimeout(() => {
        navigate(`/card/${id}`);
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <div className="mb-4 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700">
          <span className="font-medium">Error:</span> {error}
        </div>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 max-w-2xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Edit Business Card
      </h1>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <TextInput {...register("title")} placeholder="Title" />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <TextInput {...register("subtitle")} placeholder="Subtitle" />
          {errors.subtitle && (
            <p className="mt-1 text-sm text-red-600">
              {errors.subtitle.message}
            </p>
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
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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
              <p className="mt-1 text-sm text-red-600">
                {errors.street.message}
              </p>
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
            {isSubmitting ? "Updating..." : "Update Card"}
          </Button>
          <Button
            color="light"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="w-1/3"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCardPage;
