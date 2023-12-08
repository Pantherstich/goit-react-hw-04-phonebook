import { Button, ContForm, Input, Label } from './ContactForm.styled';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');
  let nameInputId = nanoid();
  let numberInputId = nanoid();

  const onChangeFilter = event => {
    const { name, value } = event.currentTarget;
    if (
      (name === 'name' && /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ' ]*$/.test(value)) ||
      (name === 'number' && /^[0-9-]*$/.test(value))
    ) {
      if (name === 'name') {
        setName(value);
      } else if (name === 'number') {
        setNumber(value);
      }
      setId(nanoid());
    }
  };
  const handleSubmit = event => {
    event.preventDefault();
    addContact({ name, number, id });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
    nameInputId = nanoid();
  };

  return (
    <ContForm onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          onChange={onChangeFilter}
          id={nameInputId}
          required
        />
      </Label>
      <Label htmlFor={numberInputId}>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={onChangeFilter}
          id={numberInputId}
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </ContForm>
  );
};
