import React, { PropTypes, PureComponent } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Button, List } from 'semantic-ui-react'
import { Scrollbars } from 'react-custom-scrollbars'
import throttle from 'lodash/throttle'
import Loading from './Loading'
import Item from './Item'
import NotFound from './NotFound'
import { when } from 'utils'
import './Projects.styl'
import { FlexContainer } from 'components'

class Projects extends PureComponent {
  get hasChildren() {
    return React.Children.count(this.props.children) > 0
  }

  handleScrollBottom = throttle(() => {
    const { loading, nextPage, onNextPage } = this.props

    when(!loading && !!nextPage, onNextPage)
  }, 300)

  render () {
    const {
      customScroll,
      children,
      loading,
      loadingMessage,
      nextPage,
      notFoundMessage,
      query,
      onNextPage
    } = this.props

    return (
      <FlexContainer className='App__Projects' onScrollBottom={this.handleScrollBottom} column customScroll={customScroll}>
        {loading && !this.hasChildren &&
          <Loading text={loadingMessage}/>
        }
        {this.hasChildren &&
          <List className='App__Projects_List' divided relaxed selection>
            {children}
          </List>
        }
        {!this.hasChildren && !loading &&
          <NotFound message={notFoundMessage} query={query}/>
        }
        {!!nextPage && this.hasChildren &&
          <div className='App__Projects_More'>
            <Button
              basic
              content='More'
              disabled={loading}
              loading={loading}
              onClick={onNextPage}
            />
          </div>
        }
      </FlexContainer>
    )
  }
}

Projects.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  notFoundMessage: PropTypes.string,
  nextPage: PropTypes.bool,
  query: PropTypes.string,
  customScroll: PropTypes.bool,
  onNextPage: PropTypes.func,
  onScrollLimit: PropTypes.func
}

export default DragDropContext(HTML5Backend)(Projects)
