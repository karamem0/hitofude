//
// Copyright (c) 2023-2025 karamem0
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
import { EventHandler } from '../../../types/Event';
import { FileVersion } from '../../../types/Model';
import { History16Regular } from '@fluentui/react-icons';
import SidePanel from '../../../common/components/SidePanel';
import bytes from 'bytes';
import { css } from '@emotion/react';
import messages from '../messages';

interface FileVersionPanelProps {
  items?: FileVersion[],
  onClick?: EventHandler<FileVersion>,
  onKeyDown?: EventHandler<FileVersion>
}

function FileVersionPanel(props: Readonly<FileVersionPanelProps>) {

  const {
    items,
    onClick,
    onKeyDown
  } = props;

  const intl = useIntl();

  return (
    <SidePanel title={intl.formatMessage(messages.VersionHistory)}>
      {
        items ? (
          <div>
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
                                  tabIndex={0}
                                  title={intl.formatMessage(messages.RestoreFile)}
                                  css={css`
                                    font-size: 1rem;
                                    line-height: 1rem;
                                  `}
                                  onClick={(event) => onClick?.(event, item)}
                                  onKeyDown={(event) => onKeyDown?.(event, item)}>
                                  <History16Regular />
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
      }
    </SidePanel>
  );

}

export default React.memo(FileVersionPanel);
