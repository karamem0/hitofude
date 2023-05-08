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
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow
} from '@fluentui/react-components';
import bytes from 'bytes';

import SidePanel from '../../../common/components/SidePanel';
import { EventHandler } from '../../../types/Event';
import { FileVersion } from '../../../types/Model';
import messages from '../messages';

interface FileVersionPanelProps {
  items?: FileVersion[],
  onOpenChange: EventHandler<boolean>
}

function FileVersionPanel(props: FileVersionPanelProps) {

  const {
    items,
    onOpenChange
  } = props;

  const intl = useIntl();

  return (
    <SidePanel
      defaultOpen
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
                  items.map((item) => (
                    <TableRow key={item.version}>
                      <TableCell>
                        <TableCellLayout appearance="primary">
                          {item.version}
                        </TableCellLayout>
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
                          {bytes(item.size || 0, { unitSeparator: ' ' })}
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
      onOpenChange={onOpenChange} />
  );

}

export default React.memo(FileVersionPanel);
