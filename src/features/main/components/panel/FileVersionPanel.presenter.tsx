//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import {
  FormattedDate,
  FormattedMessage,
  useIntl
} from 'react-intl';

import { css } from '@emotion/react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';
import { HistoryIcon } from '@fluentui/react-icons-mdl2';
import bytes from 'bytes';

import SidePanel from '../../../../common/components/SidePanel';
import { EventHandler } from '../../../../types/Event';
import { DialogAction, DialogType, FileVersion } from '../../../../types/Model';
import messages from '../../messages';

interface FileVersionPanelProps {
  items?: FileVersion[],
  onRestore?: EventHandler<DialogAction>
}

function FileVersionPanel(props: FileVersionPanelProps) {

  const {
    items,
    onRestore
  } = props;

  const intl = useIntl();

  return (
    <SidePanel
      title={intl.formatMessage(messages.VersionHistory)}
      width="30rem"
      content={
        items ? (
          <div
            css={css`
              max-height: calc(100vh - 5rem);
              overflow-x: hidden;
              overflow-y: auto;
            `}>
            <Table size="small">
              <TableHeader>
                <TableRow>
                  <TableHeaderCell key="version">
                    <FormattedMessage {...messages.Version} />
                  </TableHeaderCell>
                  <TableHeaderCell key="updatedDate">
                    <FormattedMessage {...messages.UpdatedDate} />
                  </TableHeaderCell>
                  <TableHeaderCell key="size">
                    <FormattedMessage {...messages.Size} />
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  items.map((item, index) => (
                    <TableRow key={item.version}>
                      <TableCell>
                        <TableCellLayout appearance="primary">
                          {item.version}
                        </TableCellLayout>
                        <TableCellActions>
                          {
                            index > 0 && (
                              <div
                                css={css`
                                  padding: 0 0.5rem;
                                `}>
                                <div
                                  aria-label={intl.formatMessage(messages.RestoreFile)}
                                  role="button"
                                  title={intl.formatMessage(messages.RestoreFile)}
                                  css={css`
                                    font-size: 1rem;
                                    line-height: 1rem;
                                  `}
                                  onClick={(e) => onRestore?.(e, {
                                    type: DialogType.restoreFile,
                                    payload: item
                                  })}>
                                  <HistoryIcon />
                                </div>
                              </div>
                            )
                          }
                        </TableCellActions>
                      </TableCell>
                      <TableCell>
                        <TableCellLayout>
                          <FormattedDate
                            {...{
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            }}
                            value={item.updatedDate} />
                        </TableCellLayout>
                      </TableCell>
                      <TableCell>
                        <TableCellLayout>
                          {bytes(item.size ?? 0, { unitSeparator: ' ' })}
                        </TableCellLayout>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        ) : null
      } />
  );

}

export default React.memo(FileVersionPanel);
