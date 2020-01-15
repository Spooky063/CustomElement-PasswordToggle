# Customized built-in elements `<password-toggle>`

[![npm](https://img.shields.io/npm/v/@gastier/customelement-passwordtoggle.svg)](http://npm.im/@gastier/customelement-passwordtoggle)

The goal of this module is to have a reusable component to toggle password from password type to text type.

* [Demo](https://spooky063.github.io/CustomElement-PasswordToggle/)

## Install
```bash
npm i @gastier/customelement-passwordtoggle
```

## Usage
To attach toggle button to input, use `input` attribute to list `name` password attribute.

```html
<-- Create a simple toggle button  -->
<input type="password" name="password"/>
<password-toggle input="password"></password-toggle>
```

```html
<-- Create a toggle button link to multiple input -->
<input type="password" name="password"/>
<input type="password" name="confirm"/>
<password-toggle input="password,confirm"></password-toggle>
```

```html
<-- Restricted button for device screen > 800px -->
<input type="password" name="password"/>
<password-toggle input="password" resolution-min="800"></password-toggle>
```

## Attributes

| Attribute        | Type     | Description                                                  |
|------------------|----------|--------------------------------------------------------------|
| `input`          | `string` | Name of input name attribute (separate by comma if multiple) |
| `resolution-min` | `int`    | Number of pixels minimal to render custom element            |
