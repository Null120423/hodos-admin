import PlusIcon from '@rsuite/icons/Plus';
import React, { useEffect } from 'react';
import { IconButton, Input, Tag, TagGroup } from 'rsuite';

const color = ['yellow', 'orange', 'green', 'cyan', 'blue', 'violet'];

const TagInput = ({ onChangeValue = () => {}, initValue = [] }) => {
  const [tags, setTags] = React.useState(initValue);
  const [typing, setTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const removeTag = (tag) => {
    const nextTags = tags.filter((item) => item !== tag);
    setTags(nextTags);
  };

  const addTag = () => {
    const nextTags = inputValue ? [...tags, inputValue] : tags;
    setTags(nextTags);
    setTyping(false);
    setInputValue('');
  };

  const handleButtonClick = () => {
    setTyping(true);
  };

  const renderInput = () => {
    if (typing) {
      return (
        <Input
          className='tag-input'
          size='xs'
          style={{ width: 70 }}
          value={inputValue}
          onChange={setInputValue}
          onBlur={addTag}
          onPressEnter={addTag}
        />
      );
    }

    return <IconButton onClick={handleButtonClick} icon={<PlusIcon />} appearance='ghost' size='xs' />;
  };

  useEffect(() => {
    onChangeValue(tags);
  }, [tags]);
  return (
    <div className='flex flex-col'>
      <h1>Enter tag</h1>
      <TagGroup className='pl-2 flex gap-2'>
        {tags.map((item, index) => (
          <Tag color={color[Math.round(index / 2)]} key={index} closable onClose={() => removeTag(item)}>
            {item}
          </Tag>
        ))}
        {renderInput()}
      </TagGroup>
    </div>
  );
};
export default TagInput;
