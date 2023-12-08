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

// const nameInputId = nanoid();
// const numberInputId = nanoid();

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//     id: '',
//   };

//   nameInputId = nanoid();
//   numberInputId = nanoid();

//   onChangeFilter = event => {
//     const { name, value, id } = event.currentTarget;
//     if (
//       (name === 'name' && /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ' ]*$/.test(value)) ||
//       (name === 'number' && /^[0-9-]*$/.test(value))
//     ) {
//       this.setState({ [name]: value, id });
//     }
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     this.props.addContact(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//     // this.nameInputId = nanoid();
//   };
//   render() {
//     return (
//       <ContForm onSubmit={this.handleSubmit}>
//         <Label htmlFor={nameInputId}>
//           Name
//           <Input
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={this.onChangeFilter}
//             id={nameInputId}
//             required
//           />
//         </Label>
//         <Label htmlFor={numberInputId}>
//           Number
//           <Input
//             type="tel"
//             name="number"
//             value={this.state.number}
//             onChange={this.onChangeFilter}
//             id={numberInputId}
//             required
//           />
//         </Label>
//         <Button type="submit">Add contact</Button>
//       </ContForm>
//     );
//   }
// }
