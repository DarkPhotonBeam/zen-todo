"use client";

import {
  debug,
  handleInputChange,
  todoLengthString,
} from "@/lib/client-helpers";
import TextInput from "@/components/input/TextInput";
import TextAreaInput from "@/components/input/TextAreaInput";
import { useState } from "react";
import Button from "@/components/input/Button";
import { CustomInput } from "@/components/input";
import { TodoLength } from "@/generated-types/enums";
import css from "./AddTodoForm.module.scss";
import RadioInput from "@/components/input/RadioInput";
import { validateTodo } from "@/lib/validation";
import { redirect } from "next/navigation";
import { motion } from "motion/react";

export default function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState<TodoLength>(TodoLength.A_SHORT);
  const [error, setError] = useState("");

  function test() {
    debug(title);
    debug(description);
    debug(length);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    debug("submit");
    // Perform client check before sending to server
    const valResult = validateTodo(title, description, length);
    // If client check okay, send to server for server-side validation
    if (!valResult.success) {
      debug(valResult.error);
      setError(valResult.error.issues[0].message);
      return;
    }
    const postResult = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(valResult.data),
    });

    const body = await postResult.json();

    // On success, redirect to homepage
    if (!body.success) {
      debug(body.error);
      setError(body.error);
      return;
    }

    redirect("/");
  }

  return (
    <motion.form
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      onSubmit={submit}
    >
      <h1 className={css.h1}>Add Todo</h1>
      <fieldset>
        <TextInput
          label={"Title:"}
          name={"title"}
          value={title}
          onChange={handleInputChange(setTitle)}
          required={true}
        />
        <TextAreaInput
          label={"Description:"}
          name={"description"}
          value={description}
          onChange={handleInputChange(setDescription)}
        />
        <CustomInput label={"Predicted Duration:"} name={""}>
          <div className={css.radioWrapper}>
            <div>
              <Radio
                lengthValue={TodoLength.A_SHORT}
                length={length}
                setLength={setLength}
              />
              <Radio
                lengthValue={TodoLength.B_MEDIUM}
                length={length}
                setLength={setLength}
              />
              <Radio
                lengthValue={TodoLength.D_LONG}
                length={length}
                setLength={setLength}
              />
            </div>
            <div>
              <Radio
                lengthValue={TodoLength.C_UNKNOWN}
                length={length}
                setLength={setLength}
              />
            </div>
          </div>
        </CustomInput>
      </fieldset>
      <Button isSubmit={true} label={"Add Todo"} onClick={test} />
      <span className={css.error}>{error}</span>
    </motion.form>
  );
}

interface RadioProps {
  lengthValue: TodoLength;
  length: TodoLength;
  setLength: React.Dispatch<React.SetStateAction<TodoLength>>;
}

function Radio({ lengthValue, length, setLength }: RadioProps) {
  function classOfTodoLength(length: TodoLength) {
    switch (length) {
      case TodoLength.A_SHORT:
        return css.short;
      case TodoLength.B_MEDIUM:
        return css.medium;
      case TodoLength.C_UNKNOWN:
        return css.unknown;
      case TodoLength.D_LONG:
        return css.long;
      default:
        return css.unknown;
    }
  }

  return (
    <div
      className={
        classOfTodoLength(lengthValue) +
        (length === lengthValue ? " checked" : "")
      }
    >
      <RadioInput
        checked={length === lengthValue}
        label={todoLengthString(lengthValue)}
        name={"length"}
        value={lengthValue}
        onChange={() => setLength(lengthValue)}
      />
    </div>
  );
}
