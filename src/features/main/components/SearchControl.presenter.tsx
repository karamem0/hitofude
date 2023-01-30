//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { css } from '@emotion/react';
import {
  Caption1,
  Input,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import {
  ClearIcon,
  OpenFolderHorizontalIcon,
  TextDocumentIcon
} from '@fluentui/react-icons-mdl2';

import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import messages from '../messages';
import { SearchControlFormState } from '../types/Form';

import TreeItemControl from './TreeItemControl';

interface SearchControlProps {
  loading?: boolean,
  searchFiles?: File[],
  searchQuery?: string,
  onChangeInput?: EventHandler<string>,
  onClearInput?: EventHandler,
  onOpenFileLocation?: EventHandler<File>,
  onSelectFile?: EventHandler<File>,
  onSubmit?: EventHandler<SearchControlFormState>
}

function SearchControl(props: SearchControlProps) {

  const {
    loading,
    searchFiles,
    searchQuery,
    onChangeInput,
    onClearInput,
    onOpenFileLocation,
    onSelectFile,
    onSubmit
  } = props;

  const intl = useIntl();
  const form = useForm<SearchControlFormState>();

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 1rem 2rem calc(100vh - 8rem);
        grid-template-columns: 1fr;
        grid-gap: 0.5rem;
      `}>
      <Caption1
        css={css`
          padding: 0 0.5rem;
          text-transform: uppercase;
        `}>
        <FormattedMessage {...messages.Search} />
      </Caption1>
      <form
        css={css`
          display: flex;
          flex-direction: column;
          padding: 0 0.5rem;
        `}
        onSubmit={form.handleSubmit((formState) => onSubmit?.({}, formState))}>
        <Controller
          control={form.control}
          defaultValue={searchQuery || ''}
          name="query"
          render={({ field }) => (
            <Input
              ref={field.ref}
              appearance="outline"
              aria-label={intl.formatMessage(messages.Search)}
              disabled={loading}
              placeholder={intl.formatMessage(messages.Search)}
              value={field.value}
              contentAfter={(
                <div
                  role="button"
                  css={css`
                    font-size: 0.5rem;
                    line-height: 0.5rem;
                  `}
                  onClick={(e) => {
                    form.setValue(field.name, '');
                    onClearInput?.(e);
                  }}>
                  <ClearIcon />
                </div>
              )}
              onBlur={field.onBlur}
              onChange={(e, data) => {
                field.onChange(e);
                onChangeInput?.(e, data.value);
              }} />
          )}
          rules={{
            required: true
          }} />
      </form>
      <div
        role="list"
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.25rem;
          overflow-x: hidden;
          overflow-y: auto;
        `}>
        {
          searchFiles && searchFiles.length > 0 ? (
            searchFiles.map((item) => (
              <TreeItemControl
                key={item.id}
                name={item.name}
                icon={(
                  <TextDocumentIcon
                    css={css`
                      font-size: 1rem;
                      line-height: 1rem;
                    `} />
                )}
                menu={(
                  <MenuList>
                    <MenuItem
                      key="OpenFileLocation"
                      icon={(
                        <OpenFolderHorizontalIcon
                          css={css`
                            font-size: 1rem;
                            line-height: 1rem;
                          `} />
                      )}
                      onClick={(e) => onOpenFileLocation?.(e, item)}>
                      <FormattedMessage {...messages.OpenFileLocation} />
                    </MenuItem>
                  </MenuList>
                )}
                onClick={(e) => onSelectFile?.(e, item)} />
            ))
          ) : (
            <Caption1
              css={css`
                text-align: center;
              `}>
              <FormattedMessage {...messages.NoItemFound} />
            </Caption1>
          )
        }
      </div>
    </div>
  );

}

export default React.memo(SearchControl);
