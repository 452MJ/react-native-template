// @ts-ignore
import { connect } from 'react-redux'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'

export default connect(state => state)(ListTemplate)
function ListTemplate() {
  const [params, setParams] = useState({
    refreshing: false,
    page: 1,
    loadEnd: false,
    loadFinish: false,
  })
  const paramsRef = useRef(params)
  const [list, setList] = useState([])
  const listRef = useRef(list)

  const fetchList = useCallback(async (refresh = false) => {
    paramsRef.current.loadFinish = false
    const res = await $services.url({
      ...paramsRef.current,
    })
    listRef.current = refresh ? res : listRef.current.concat(res)
    setList(listRef.current)
    paramsRef.current = {
      refreshing: false,
      page: paramsRef.current.page + 1,
      loadEnd: res.length < 20,
      loadFinish: true,
    }
    setParams(paramsRef.current)
  }, [])

  const onLoadMore = useCallback(() => {
    if (paramsRef.current.loadEnd || !paramsRef.current.loadFinish) {
      return
    }

    fetchList()
  }, [fetchList])

  const onRefresh = useCallback(() => {
    paramsRef.current = {
      refreshing: true,
      page: 1,
      loadEnd: false,
      loadFinish: false,
    }
    setParams(paramsRef.current)

    fetchList(true)
  }, [fetchList])

  useEffect(() => {
    onRefresh()
  }, [onRefresh])

  const renderItem = useCallback(({ item, index }) => {}, [])

  return (
    <FlatList
      data={list}
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: 'center' }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      onEndReached={onLoadMore}
      refreshing={params.refreshing}
      onRefresh={onRefresh}
    />
  )
}
