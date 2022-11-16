//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/hitofude/blob/main/LICENSE
//

import React from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import { css } from '@emotion/react';
import {
  Button,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@fluentui/react-components';
import {
  AddIcon,
  CopyIcon,
  DeleteIcon,
  FolderHorizontalIcon,
  PageAddIcon,
  RenameIcon,
  TextDocumentIcon
} from '@fluentui/react-icons-mdl2';
import { FabricNewFolderIcon, OneDriveLogoIcon } from '@fluentui/react-icons-mdl2-branded';

import { themeConfig } from '../../../providers/ThemeProvider';
import { EventHandler } from '../../../types/Event';
import { File, Folder } from '../../../types/Model';
import messages from '../messages';
import {
  DialogAction,
  DialogType
} from '../types/Dialog';

import TreeHeaderControl from './TreeHeaderControl';
import TreeItemControl from './TreeItemControl';

interface TreeControlProps {
  tabMode?: boolean,
  workFile?: File,
  workFolder?: Folder,
  onOpenDialog?: EventHandler<DialogAction>,
  onOpenUrl?: EventHandler<string>,
  onSelectFile?: EventHandler<File>,
  onSelectFolder?: EventHandler<string>,
  onToggleTab?: EventHandler<boolean>
}

function TreeControl(props: TreeControlProps) {

  const {
    tabMode,
    workFile,
    workFolder,
    onOpenDialog,
    onOpenUrl,
    onSelectFile,
    onSelectFolder,
    onToggleTab
  } = props;

  const intl = useIntl();

  return workFolder ? (
    <section
      css={css`
        display: grid;
        grid-template-rows: calc(100vh - 2rem);
        grid-template-columns: auto 1fr;
      `} >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding: 1rem 0.5rem;
          background-color: ${themeConfig.colorNeutralBackground3};
        `} >
        <Button
          appearance="transparent"
          aria-label={intl.formatMessage(messages.File)}
          icon={
            <TextDocumentIcon
              css={css`
                font-size: 1rem;
              `} />
          }
          onClick={(e) => onToggleTab?.(e, !tabMode)} />
      </div>
      {
        tabMode ? null : (
          <div
            css={css`
              display: grid;
              grid-template-rows: 2rem calc(100vh - 9rem) 2rem;
              grid-template-columns: 1fr;
              grid-gap: 0.5rem;
              width: 20rem;
              max-width: calc(100vw - 4rem);
              padding: 1rem 0;
              background-color: ${themeConfig.colorNeutralBackground2};
            `}>
            <TreeHeaderControl
              disabled={!workFolder.parentId}
              name={workFolder.parentId ? workFolder.name : intl.formatMessage(messages.RootFolder)}
              menu={(
                <MenuList>
                  <MenuGroup>
                    <MenuItem
                      key="CreateFile"
                      icon={(
                        <PageAddIcon
                          css={css`
                            font-size: 1rem;
                          `} />
                      )}
                      onClick={(e) => onOpenDialog?.(e, {
                        type: DialogType.createFile,
                        payload: undefined
                      })}>
                      <FormattedMessage {...messages.NewFile} />
                    </MenuItem>
                    <MenuItem
                      key="CreateFolder"
                      icon={(
                        <FabricNewFolderIcon
                          css={css`
                            font-size: 1rem;
                          `} />
                      )}
                      onClick={(e) => onOpenDialog?.(e, {
                        type: DialogType.createFolder,
                        payload: undefined
                      })}>
                      <FormattedMessage {...messages.NewFolder} />
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem
                      key="OpenWithOneDrive"
                      icon={(
                        <OneDriveLogoIcon
                          css={css`
                            font-size: 1rem;
                          `} />
                      )}
                      onClick={(e) => onOpenUrl?.(e, workFolder.webUrl)}>
                      <FormattedMessage {...messages.OpenWithOneDrive} />
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              )}
              onClick={(e) => onSelectFolder?.(e, workFolder?.parentId)} />
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
                workFolder.folders?.map((item) => (
                  <TreeItemControl
                    key={item.id}
                    name={item.name}
                    icon={(
                      <FolderHorizontalIcon
                        css={css`
                          font-size: 1rem;
                        `} />
                    )}
                    menu={(
                      <MenuList>
                        <MenuItem
                          key="RenameFolder"
                          icon={(
                            <RenameIcon
                              css={css`
                                font-size: 1rem;
                              `} />
                          )}
                          onClick={(e) => onOpenDialog?.(e, {
                            type: DialogType.renameFolder,
                            payload: item
                          })}>
                          <FormattedMessage {...messages.RenameFolder} />
                        </MenuItem>
                        <MenuItem
                          key="DeleteFolder"
                          icon={(
                            <DeleteIcon
                              css={css`
                                font-size: 1rem;
                              `} />
                          )}
                          onClick={(e) => onOpenDialog?.(e, {
                            type: DialogType.deleteFolder,
                            payload: item
                          })}>
                          <FormattedMessage {...messages.DeleteFolder} />
                        </MenuItem>
                      </MenuList>
                    )}
                    onClick={(e) => onSelectFolder?.(e, item.id)} />
                ))
              }
              {
                workFolder.files?.map((item) => (
                  <TreeItemControl
                    key={item.id}
                    name={item.name}
                    selected={workFile?.id === item.id}
                    icon={(
                      <TextDocumentIcon
                        css={css`
                          font-size: 1rem;
                        `} />
                    )}
                    menu={(
                      <MenuList>
                        <MenuGroup>
                          <MenuItem
                            key="CopyFile"
                            icon={(
                              <CopyIcon
                                css={css`
                                  font-size: 1rem;
                                `} />
                            )}
                            onClick={(e) => onOpenDialog?.(e, {
                              type: DialogType.copyFile,
                              payload: item
                            })}>
                            <FormattedMessage {...messages.CopyFile} />
                          </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup>
                          <MenuItem
                            key="RenameFile"
                            icon={(
                              <RenameIcon
                                css={css`
                                  font-size: 1rem;
                                `} />
                            )}
                            onClick={(e) => onOpenDialog?.(e, {
                              type: DialogType.renameFile,
                              payload: item
                            })}>
                            <FormattedMessage {...messages.RenameFile} />
                          </MenuItem>
                          <MenuItem
                            key="DeleteFile"
                            icon={(
                              <DeleteIcon
                                css={css`
                                  font-size: 1rem;
                                `} />
                            )}
                            onClick={(e) => onOpenDialog?.(e, {
                              type: DialogType.deleteFile,
                              payload: item
                            })}>
                            <FormattedMessage {...messages.DeleteFile} />
                          </MenuItem>
                        </MenuGroup>
                      </MenuList>
                    )}
                    onClick={(e) => onSelectFile?.(e, item)} />
                ))
              }
            </div>
            <div
              css={css`
                display: grid;
                padding: 0 0.5rem;
              `}>
              <Button
                appearance="outline"
                aria-label={intl.formatMessage(messages.NewFile)}
                title={intl.formatMessage(messages.NewFile)}
                icon={
                  <AddIcon
                    css={css`
                      font-size: 1rem;
                    `} />
                  }
                onClick={(e) => onOpenDialog?.(e, {
                  type: DialogType.createFile,
                  payload: undefined
                })}>
                <FormattedMessage {...messages.NewFile} />
              </Button>
            </div>
          </div>
        )
      }
    </section>
  ) : null;

}

export default React.memo(TreeControl);
