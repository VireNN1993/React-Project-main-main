// src/pages/CreateCard/CreateCardPage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useCreateCard } from "../../hooks/useCreateCard";
import CardForm from "../../components/CardForm";
import { CreateCardFormData } from "../../types/Card";

const CreateCardPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isLoggedIn,
    isBusiness,
  } = useCreateCard();

  const handleFormSubmit = async (
    data: CreateCardFormData,
  ): Promise<boolean> => {
    const success = await onSubmit(data);
    if (success) {
      setTimeout(() => {
        navigate("/my-cards");
      }, 1500);
    }
    return success;
  };

  // Check user permissions
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <div className="mb-4 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700">
          <span className="font-medium">Authentication required!</span> Please
          sign in to continue.
        </div>
        <Button className="mt-4" onClick={() => navigate("/signin")}>
          Sign In
        </Button>
      </div>
    );
  }

  // תיקון בבדיקה - רק משתמשים עסקיים
  if (!isBusiness) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <div className="mb-4 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700">
          <span className="font-medium">Permission denied!</span> Only business
          users can create cards.
        </div>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 max-w-2xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Create New Business Card
      </h1>

      <CardForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Create Card"
        submittingLabel="Creating..."
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default CreateCardPage;
