import React from 'react';
import { useForm } from 'react-hook-form';

export const WwithUseFormHook = (Component) => {
  return class extends React.Component {
    render() {
      const { register, handleSubmit, formState: { errors } } = useForm();
      return (
        <Component
          {...this.props}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      );
    }
  };
};
