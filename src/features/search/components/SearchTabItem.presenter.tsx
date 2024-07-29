//
// Copyright (c) 2023-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { Controller, UseFormReturn } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Caption1, Input } from '@fluentui/react-components';
import { ClearIcon } from '@fluentui/react-icons-mdl2';

import { css } from '@emotion/react';

import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import messages from '../messages';
import { SearchTabItemFormState } from '../types/Form';

import SearchTreeItem from './SearchFileTreeItem';

interface SearchTabItemProps {
  form?: UseFormReturn<SearchTabItemFormState>,
  loading?: boolean,
  query?: string,
  resultFiles?: File[],
  onClear?: EventHandler,
  onSubmit?: EventHandler<SearchTabItemFormState>
}

function SearchTabItem(props: Readonly<SearchTabItemProps>) {

  const {
    form,
    loading,
    query,
    resultFiles,
    onClear,
    onSubmit
  } = props;

  const intl = useIntl();

  return form ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: 1rem 2rem calc(100svh - 8rem);
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
          defaultValue={query ?? ''}
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
                  tabIndex={-1}
                  css={css`
                    font-size: 0.5rem;
                    line-height: 0.5rem;
                  `}
                  onClick={(event) => {
                    form.setValue(field.name, '');
                    onClear?.(event);
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter') {
                      return;
                    }
                    form.setValue(field.name, '');
                    onClear?.(event);
                  }}>
                  <ClearIcon />
                </div>
              )}
              onBlur={field.onBlur}
              onChange={field.onChange} />
          )}
          rules={{
            required: true
          }} />
      </form>
      <div
        role="table"
        css={css`
          display: flex;
          flex-direction: column;
          grid-gap: 0.25rem;
          overflow: hidden auto;
        `}>
        {
          resultFiles && resultFiles.length > 0 ? (
            <SearchTreeItem />
          ) : (
            <Caption1
              css={css`
                text-align: center;
              `}>
              <FormattedMessage {...messages.NoItemsFound} />
            </Caption1>
          )
        }
      </div>
    </div>
  ) : null;

}

export default React.memo(SearchTabItem);
