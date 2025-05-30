//
// Copyright (c) 2023-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  Button,
  Input,
  Text
} from '@fluentui/react-components';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { SearchTabPanelFormField, SearchTabPanelFormState } from '../types/Form';
import { Dismiss16Regular } from '@fluentui/react-icons';
import { EventHandler } from '../../../types/Event';
import { File } from '../../../types/Model';
import SearchTreeItem from './SearchFileTreeItem';
import Tree from '../../../common/components/Tree';
import { css } from '@emotion/react';
import { layouts } from '../../../themes/Layout';
import messages from '../messages';
import { useTheme } from '../../../providers/ThemeProvider';

interface SearchTabPanelProps {
  form?: UseFormReturn<SearchTabPanelFormState>,
  loading?: boolean,
  query?: string,
  resultFiles?: File[],
  onClear?: EventHandler<SearchTabPanelFormField>,
  onSubmit?: EventHandler<SearchTabPanelFormState>
}

function SearchTabPanel(props: Readonly<SearchTabPanelProps>) {

  const {
    form,
    loading,
    query,
    resultFiles,
    onClear,
    onSubmit
  } = props;

  const intl = useIntl();
  const { theme } = useTheme();

  return form ? (
    <div
      css={css`
        display: grid;
        grid-template-rows: 1rem 2rem calc(${layouts.appTab.height} - 3rem);
        grid-template-columns: 1fr;
        grid-gap: 0.5rem;
      `}>
      <Text
        as="h2"
        css={css`
          padding: 0 0.5rem;
          font-size: ${theme.fontSizeBase200};
          line-height: calc(${theme.lineHeightBase200} * 1.25);
          text-transform: uppercase;
        `}>
        <FormattedMessage {...messages.Search} />
      </Text>
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
                <Button
                  appearance="transparent"
                  size="small"
                  tabIndex={0}
                  icon={(
                    <Dismiss16Regular />
                  )}
                  onClick={(event) => onClear?.(event, field.name)} />
              )}
              onBlur={field.onBlur}
              onChange={field.onChange} />
          )}
          rules={{
            required: true
          }} />
      </form>
      <Tree disabled={resultFiles?.length === 0}>
        <SearchTreeItem />
      </Tree>
    </div>
  ) : null;

}

export default React.memo(SearchTabPanel);
