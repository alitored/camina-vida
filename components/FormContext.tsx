"use client";

import React, { createContext, useContext, useState } from "react";

type FormContextType = {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormContext.Provider value={{ isOpen, openForm: () => setIsOpen(true), closeForm: () => setIsOpen(false) }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm debe usarse dentro de FormProvider");
  return context;
}