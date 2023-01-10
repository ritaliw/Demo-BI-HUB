import React from 'react';
// import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};

const options: IDropdownOption[] = [
  { key: 'key1', text: 'val1', itemType: DropdownMenuItemType.Header },
];

const stackTokens: IStackTokens = { childrenGap: 20 };

export const UserProfileDropdown: React.FunctionComponent = () => {
  return (
    // <Stack tokens={stackTokens}>
    <Dropdown placeholder="Select an option" label="Basic uncontrolled example" options={options} styles={dropdownStyles} />
    // </Stack>
  );
};

export default UserProfileDropdown;
