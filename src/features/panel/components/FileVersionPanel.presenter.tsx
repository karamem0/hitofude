//
// Copyright (c) 2023-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tooltip
} from '@fluentui/react-components';
import { History16Regular } from '@fluentui/react-icons';
import bytes from 'bytes';
import {
  FormattedDate,
  FormattedMessage,
  useIntl
} from 'react-intl';
import SidePanel from '../../../common/components/SidePanel';
import { EventHandler } from '../../../types/Event';
import { FileVersion } from '../../../types/Model';
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
                                <Tooltip
                                  content={intl.formatMessage(messages.RestoreFile)}
                                  relationship="label">
                                  <div
                                    role="button"
                                    tabIndex={0}
                                    css={css`
                                      font-size: 1rem;
                                      line-height: 1rem;
                                    `}
                                    onClick={(event) => onClick?.(event, item)}
                                    onKeyDown={(event) => onKeyDown?.(event, item)}>
                                    <History16Regular />
                                  </div>
                                </Tooltip>
                              </div>
                            )
                          }
                        </TableCellActions>
                      </TableCell>
                      <TableCell>
                        <TableCellLayout>
                          <FormattedDate
                            {...{
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
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
